package com.example.myHW;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/calc")

public class myClass {
	@GetMapping("/arith")
	public String arithmetic(@RequestParam String firstTerm, @RequestParam String secondTerm, @RequestParam String operator) {
		double first = Double.parseDouble(firstTerm);
		double second = Double.parseDouble(secondTerm);
		double result = 0;
		boolean ErrorFlag = false;
		switch(operator) {
		case "x":
			result = first * second;
			break;
		case"-":
			result = first - second;
			break;
		case"÷":
			if(second==0 || second==0.0)
				ErrorFlag = true;
			else {
				result = first / second;
			}
			break;
		default:
			result = first + second;
		}
		if(ErrorFlag) {
			return "Error";
		}
		System.out.println(first);
		System.out.println(operator);
		System.out.println(second);
		System.out.println(result);
		return String.valueOf(result);
	}//end of function
	@GetMapping("/uni")
	public String uniTerm(@RequestParam String term, @RequestParam String operator) {
		double number = Double.parseDouble(term);
		double result = 0;
		boolean ErrorFlag = false;
		switch(operator) {
		case" /-":
			result = number*-1;
			break;
		case"1/x":
			if(number==0 || number==0.0)
				ErrorFlag = true;
			else {
				result = 1/number;
			}
			break;
		case"²√x":
			if(number<0)
				ErrorFlag = true;
			else {
				result = Math.sqrt(number);
			}
			break;
		case"%":
			result = number/100;
			break;
		case"x²":
			result = number*number;
		break;
		default:
			result = number;
		}
		if(ErrorFlag) {
			return "Error";
		}
		System.out.println(term);
		System.out.println(operator);
		System.out.println(result);
		return String.valueOf(result);	
	}
}
