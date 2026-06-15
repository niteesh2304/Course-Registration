package com.example.FirstSpringBoot;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class Pen implements Writer{

    public Pen() {
        System.out.println("this pen constructor");
    }

    public void write(){
        System.out.println("pen is writing..");
    }
}
