"use strict"

import { use, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


export default function Alphabet({customers, filterCustomers, showList}){

    
    
    // first remove duplicates with a Set -> transform into a array -> map and take each first name's letter
    const firstLettersOnCustomerList = Array.from(new Set(customers))
                                        .map(customer => customer.first_name[0]);
    const alphabetArray = ALPHABET.split("");
    const alphabetArrayStatus = [];

    // array with status to verify if there is any name with a given first letter
    alphabetArray.forEach(letterAlphabet => {
        if (firstLettersOnCustomerList.includes(letterAlphabet)){
            alphabetArrayStatus.push({
                letter: letterAlphabet,
                status: true
            })
        }else{
            alphabetArrayStatus.push({
                letter: letterAlphabet,
                status: false
            })
        }
    })

    return (
        <>
            <div className="container alphabet">
                <h4>Filter by First Name Letter</h4>
            
                <div className="button-container">
                    
                    {alphabetArrayStatus.map(letter =>
                        letter.status ? 
                            <button 
                                onClick={(e) => filterCustomers(e)} 
                                value={letter.letter} 
                                key={letter.letter} 
                                type="button" 
                                className="btn btn-success button"
                            >
                                {letter.letter}
                            </button> 
                            :
                            <button 
                                key={letter.letter} 
                                type="button" 
                                className="btn btn-secondary button" 
                                disabled
                            >
                                {letter.letter}
                            </button>
                    )}
                </div>
                <div>
                    {showList && <p>Show</p>}
                </div>
            </div>
        </>
    )
}