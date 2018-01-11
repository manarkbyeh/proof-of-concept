<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use lepiaf\SerialPort\SerialPort;
use lepiaf\SerialPort\Parser\SeparatorParser;
use lepiaf\SerialPort\Configure\TTYConfigure;

class HomeController extends Controller
{
    /**
    * Create a new controller instance.
    *
    * @return void
    */
    
    
    /**
    * Show the application dashboard.
    *
    * @return \Illuminate\Http\Response
    */
    public function index(){
        
        
        $serialPort = new SerialPort(new SeparatorParser(), new TTYConfigure());
        $serialPort->open("COM3");
        echo $serialPort->read();

        // while ($data = $serialPort->read()) {
        //     echo $data."\n";
        //     if ($data === "OK") {
        //         $serialPort->write("1\n");
        //         $serialPort->close();
        //     }
        // }
        //  echo $serialPort->read(); // Adafruit Fingerprint Sensor Enrollment
        //  echo $serialPort->read(); // Found fingerprint sensor (hopelijk ;) )
        //  echo $serialPort->read(); // Ready to enroll a fingerprint
        // echo $serialPort->read();
       
        //  $serialPort->write("1\n");
        //van hier gaat hij beginnen in lezen 
        // echo $serialPort->read();
       //  echo $serialPort->read();
       /* while ($data = $serialPort->read()) {
            echo $data."\n";
            if ($data === "OK") {
                $serialPort->write("1\n");
                $serialPort->close();
            }      
        }*/ 



         /*$serialPort = new SerialPort(new SeparatorParser(), new TTYConfigure() );
         $serialPort->open("COM3");*/
        

        // $serialPort->write("1\n");
        // echo $serialPort->read(); // Adafruit Fingerprint Sensor Enrollment
        // echo $serialPort->read(); // Found fingerprint sensor (hopelijk ;) )
        // echo $serialPort->read(); // Ready to enroll a fingerprint
        // echo $serialPort->read();
       
        // $serialPort->write("1\n");
        //van hier gaat hij beginnen in lezen 
        // echo $serialPort->read();
        // echo $serialPort->read();


        /* while ($data = $serialPort->read()) {
            echo $data."\n";
        } */


        //echo $serialPort->read();
        //echo $serialPort->read();
        //echo $serialPort->read();



        //while

        // echo $serialPort->close();
        
        //}
        /*     {
        $serialPort = new SerialPort(new SeparatorParser(), new TTYConfigure());
        $serialPort->open("COM3");
        
        $x=1;
        while ($x <=100) {
        echo" de nummer is ".$x;
        $x++;
        
        
        } */
        
        /* while ($data = $serialPort->read()) {
        //echo $data."\n";
        
        if ($data === "OK") {
        $serialPort->write("1\n");
        $serialPort->close();
        }
        }
        echo "test"; */
    }
}