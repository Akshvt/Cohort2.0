using System;

class Problem{
    static void main(String[] args)
    {
        StringBuilder input = new StringBuilder();
        string line;

        while((line = console.ReadLine())!=null){
            input.Append(line).Append("\n");
        }

        string my_var =input.ToString().Trim();

        if(my_var.Equals("Hello")){
            console.WriteLine("yoyoo");
            return;
            
        }

        throw new Exception(my_var);
    }
}