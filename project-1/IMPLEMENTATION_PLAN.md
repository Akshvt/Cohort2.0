# Follow Status Feature — Implementation Plan

## Project Context

This is a Node.js/Express + MongoDB (Mongoose) Instagram-clone backend.

- **Auth**: JWT stored in cookies. Middleware `identifyUser` decodes it and adds `req.user = { id, username }` to every protected request.
- **Base Routes**: `/api/auth`, `/api/posts`, `/api/users`
- **Models**: `users`, `follows`, `posts`, `likes`

---

## Goal

Implement a **Follow Request System** where:
- Following a **public** user → status `"accepted"` immediately.
- Following a **private** user → status `"pending"` until they approve.

The `follow.model.js` already has the `status` field with enum `["pending", "accepted", "rejected"]`. The model is ready.

---

## Existing Code (Current State)

### follow.model.js
```js
const followSchema = new mongoose.Schema({
    follower: { type: String },
    followee: { type: String },
    status: {
        type: String,
        default: "pending",
        enum: { values: ["pending", "accepted", "rejected"], message: "status can only be pending, accepted or rejected" }
    }
}, { timestamps: true })
followSchema.index({ follower: 1, followee: 1 }, { unique: true })
```

### user.model.js
```js
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: String,
    profileImage: { type: String, default: "<default_url>" }
})
```

### user.controller.js — Current `followUserController` (has a bug!)
```js
async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username
    // checks: can't follow self, followee must exist, not already following
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
        // status is NOT set — defaults to "pending" always (BUG!)
    })
    res.status(201).json({ message: `You are now following ${followeeUsername}`, follow: followRecord })
}
```

> **WARNING:** Currently, `followModel.create` never sets `status`, so every follow defaults to `"pending"` — meaning no one is ever actually followed. This is the core bug to fix.

### user.routes.js
> **WARNING:** This file was accidentally deleted. It needs to be recreated from scratch (see Step 3 below).

---

## Step-by-Step Implementation

### ✅ Step 1 — MODIFY `src/models/user.model.js`
Add `isPrivate` flag to the schema:
```js
isPrivate: {
    type: Boolean,
    default: false
}
```

---

### ✅ Step 2 — MODIFY `src/controllers/user.controller.js`

#### Update `followUserController`
After confirming the followee exists, check their `isPrivate` field:
```js
// Determine status based on followee's privacy
const status = isFolloweeExists.isPrivate ? "pending" : "accepted"

const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: status
})

const message = status === "accepted"
    ? `You are now following ${followeeUsername}`
    : `Follow request sent to ${followeeUsername}`

res.status(201).json({ message, follow: followRecord })
```

#### Add 3 New Controllers

**`getFollowRequestsController`** — Shows incoming pending requests to the logged-in user:
```js
async function getFollowRequestsController(req, res) {
    const myUsername = req.user.username
    const requests = await followModel.find({ followee: myUsername, status: "pending" })
    res.status(200).json({ message: "Follow requests fetched", requests })
}
```

**`acceptFollowRequestController`** — Accept a specific request:
```js
async function acceptFollowRequestController(req, res) {
    const myUsername = req.user.username           // the receiver
    const requesterUsername = req.params.username  // the sender

    const followRecord = await followModel.findOneAndUpdate(
        { follower: requesterUsername, followee: myUsername, status: "pending" },
        { status: "accepted" },
        { new: true }
    )

    if (!followRecord) {
        return res.status(404).json({ message: "No pending request found from this user" })
    }

    res.status(200).json({ message: `You accepted ${requesterUsername}'s follow request`, follow: followRecord })
}
```

**`rejectFollowRequestController`** — Reject (delete) a specific request:
```js
async function rejectFollowRequestController(req, res) {
    const myUsername = req.user.username
    const requesterUsername = req.params.username

    const followRecord = await followModel.findOneAndDelete(
        { follower: requesterUsername, followee: myUsername, status: "pending" }
    )

    if (!followRecord) {
        return res.status(404).json({ message: "No pending request found from this user" })
    }

    res.status(200).json({ message: `You rejected ${requesterUsername}'s follow request` })
}
```

---

### ✅ Step 3 — RECREATE `src/routes/user.routes.js`
> This file was deleted. Recreate it with the new routes added:

```js
const express = require('express');
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();

// POST /api/users/follow/:username
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

// POST /api/users/unfollow/:username
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

// GET /api/users/requests
userRouter.get("/requests", identifyUser, userController.getFollowRequestsController)

// PUT /api/users/accept/:username
userRouter.put("/accept/:username", identifyUser, userController.acceptFollowRequestController)

// PUT /api/users/reject/:username
userRouter.put("/reject/:username", identifyUser, userController.rejectFollowRequestController)

module.exports = userRouter;
```

---

### ✅ Step 4 — MODIFY `src/controllers/post.controller.js` (When adding a feed)

If/when a feed feature is added (posts from people I follow), ensure the query filters by `status: "accepted"`:
```js
const following = await followModel.find({ follower: req.user.username, status: "accepted" })
const followingUsernames = following.map(f => f.followee)
const posts = await postModel.find({ user: { $in: followingUsernames } })
```

> **NOTE:** The current `getPostController` only fetches the logged-in user's own posts, so this step is only needed when a feed/explore feature is built.

---

## Verification Scenarios

| Scenario | Action | Expected Result |
|---|---|---|
| Public User | A follows B (public) | Status = `accepted` instantly |
| Private User | A follows C (private) | Status = `pending`, C sees request |
| Accept Request | C accepts A | Status changes to `accepted` |
| Reject Request | C rejects A | Record deleted, A can request again |
| Feed Safety | Fetch posts | Only from `accepted` connections |
