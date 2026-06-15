package com.example.FirstSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
public class Student {
    @Autowired//-->field injection in spring boot
    @Qualifier("pen")
    Writer writer;



    public Student(){
        System.out.println("Student constructor");
    }

    public void show(){
        System.out.println("this is show method from student");
    }

    public void ExamWrite(){
        writer.write();
    }
}
