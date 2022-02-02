import React, { useEffect, useState } from 'react';
import "../css/generatecodes.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenerateCodes = (props) => {

    const test = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
            
        await fetch("/api/addcode/5")
        .then(response => response.text())
        .then((response) => {
            document.getElementById('genlink').value = response;
        })
        .catch(err => console.log(err))

        var content = document.getElementById('genlink');
        content.select();
        navigator.clipboard.writeText(document.getElementById('genlink').value)
        .then(() => {})
        .catch((error) => { alert(`Copy failed! ${error}`) })        
        props.alertGen();
    }

    return (
        <div className="block">
            <div className="header"> Open Sesame </div>
            
            <div className="form">
                <input type="number" name="usages" min="1" defaultValue="1"/>
                <br/>
                <button className="button1" onClick={() => test()}> Generera Länk </button>
            </div>

            <textarea id="genlink" name="genlink" className="textareagenlink"></textarea>
        </div>
    )
}

export default (GenerateCodes);
