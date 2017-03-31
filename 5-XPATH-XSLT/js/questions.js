var formElement=null;
var numeroSecreto1=null;
var numeroSecreto2=null;
var respuestaSelect1=null;
var respuestaSelect2=null;
var respuestasMultiple1=[];
var respuestasMultiple2=[];
var respuestasRadio1= null;
var respuestasRadio2 = null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var nota = 0;  //nota de la prueba sobre 10 puntos (hay 10 preguntas)
var xmlDoc = null;
var xslDoc = null;

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){      
      corregirRadio1();
      corregirRadio2();
      corregirCheckbox1(); 
      corregirCheckbox2();
      corregirNumber1();
      corregirNumber2();
      corregirSelect1();
      corregirSelect2();
      corregirSelectMultiple1();
      corregirSelectMultiple2();
      presentarNota();
   }
  return false;
 }
 
 //LEER XML de xml/questions.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 //xhttp.open("GET", "https://rawgit.com/simarjeetsingh/LLM/master/PreguntasXML/Validaci%C3%B3n%20XML%20con%20XSD/questions.xml", true);
 xhttp.send();

 //LEER XSL de xml/questions.xml
 var xhttp2 = new XMLHttpRequest();
 xhttp2.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   xslDoc=this.responseXML;
  }
 };
 xhttp2.open("GET", "xml/questions.xsl", true);
 xhttp2.send();
 
}
//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/questions.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
  xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
//radio1------------------------------
 var tituloRadio1 = xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var xpath="/questions/question[@id='jdos_001']/options";
 var nodesRadio1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 //for (i = 0; i < nopt; i++) { 
   // opcionesRadio1[i]=xmlDoc.getElementById("jdos_001").getElementsByTagName('options')[i].innerHTML;
 //}  
 ponerDatosRadio1Html(tituloRadio1,nodesRadio1);
 respuestasRadio1=xmlDoc.getElementById("jdos_001").getElementsByTagName("answer")[0].innerHTML;

//radio2------------------------------
 var tituloRadio2 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var xpath="/questions/question[@id='jdos_002']/options";
 var nodesRadio2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 //for (i = 0; i < nopt; i++) { 
   // opcionesRadio2[i]=xmlDoc.getElementById("jdos_002").getElementsByTagName('options')[i].innerHTML;
 //}  
 ponerDatosRadio2Html(tituloRadio2,nodesRadio2);
  respuestasRadio2=xmlDoc.getElementById("jdos_002").getElementsByTagName("answer")[0].innerHTML;

 //CHECKBOX1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var xpath="/questions/question[@id='jdos_003']/options";
 var nodesCheckbox1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 ponerDatosCheckbox1Html(tituloCheckbox1,nodesCheckbox1);
 //guardamos las respuestas correctas
 var nres = xmlDoc.getElementById("jdos_003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("jdos_003").getElementsByTagName("answer")[i].innerHTML;
 }
  //CHECKBOX2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var xpath="/questions/question[@id='jdos_004']/options";
 var nodesCheckbox2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosCheckbox2Html(tituloCheckbox2,nodesCheckbox2);
 var nres = xmlDoc.getElementById("jdos_004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("jdos_004").getElementsByTagName("answer")[i].innerHTML;
 }

//NUMBER1
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput1=xmlDoc.getElementsByTagName("title")[4].innerHTML;
 ponerDatosInput1Html(tituloInput1);
 numeroSecreto1=xmlDoc.getElementById("jdos_005").getElementsByTagName("answer")[0].innerHTML;
 //numeroSecreto1=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //Number2
 var tituloInput2=xmlDoc.getElementsByTagName("title")[5].innerHTML;
 ponerDatosInput2Html(tituloInput2);
 numeroSecreto2=xmlDoc.getElementById("jdos_006").getElementsByTagName("answer")[0].innerHTML;
 //numeroSecreto2=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

 //SELECT1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect1=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var xpath="/questions/question[@id='jdos_007']/options";
 var nodesSelect1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelect1Html(tituloSelect1,nodesSelect1);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

//SELECT2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect2=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var xpath="/questions/question[@id='jdos_008']/options";
 var nodesSelect2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelect2Html(tituloSelect2,nodesSelect2);
 respuestaSelect2=parseInt(xmlDoc.getElementById("jdos_008").getElementsByTagName("answer")[0].innerHTML);


 //Select multiple 1 ******************
 var selectMultiple1=xmlDoc.getElementsByTagName("title")[8].innerHTML;
  var xpath="/questions/question[@id='jdos_009']/options";
 var nodesSelectMultiple1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectMultiple1Html(selectMultiple1,nodesSelectMultiple1);
 var nres = xmlDoc.getElementById("jdos_009").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) {
   respuestasMultiple1[i]=xmlDoc.getElementById("jdos_009").getElementsByTagName("answer")[i].innerHTML;
 }
 
//Select multiple 2
 var selectMultiple2=xmlDoc.getElementsByTagName("title")[9].innerHTML;
  var xpath="/questions/question[@id='jdos_010']/options";
 var nodesSelectMultiple2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectMultiple2Html(selectMultiple2,nodesSelectMultiple2);
 var nres = xmlDoc.getElementById("jdos_010").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) {
   respuestasMultiple2[i]=xmlDoc.getElementById("jdos_010").getElementsByTagName("answer")[i].innerHTML;
 } 
}

//Seleccionar sin pulsar la tecla ctrl
 window.onmousedown = function (e) {
    var el = e.target;
    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        // hack to correct buggy behavior
        var select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
 }
//****************************************************************************************************
//implementación de la corrección
// Corregir radio ----------------------------
function corregirRadio1(){
  var f=formElement;
  var escorrecta = null;
  var notaRad1 = 0;
  for (i = 0; i < f.colorR1.length; i++) { //"colorR1" es el nombre asignado a todos los RadioButtons
    if (f.colorR1[i].checked) {
      escorrecta =false;        
     if (i==respuestasRadio1) escorrecta=true;
    }
  }   
    if (escorrecta) {
     notaRad1 +=1.0;   
     darRespuestaHtml("P1: Correcta");
     nota +=1.0;    
    } else {
     nota -=1.0;    
     darRespuestaHtml("P1: Incorrecta");     
  }
}

function corregirRadio2(){
  var f=formElement;
  var escorrecta = null;
  var notaRad2 = 0;
  for (i = 0; i < f.colorR2.length; i++) { //"colorR2" es el nombre asignado a todos los RadioButtons
    if (f.colorR2[i].checked) {
      escorrecta =false;         
     if (i==respuestasRadio2) escorrecta=true;
    }
  }   
    if (escorrecta) {
     notaRad2 +=1.0;   
     darRespuestaHtml("P2: Correcta");
     nota +=1.0;    
    } else {
     nota -=1.0;    
     darRespuestaHtml("P2: Incorrecta");     
  }
}
// Corregir checkbox ----------------------------
function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  var notaCheckbox1 = 0;
  for (i = 0; i < f.colorCBX1.length; i++) {  //"colorCBX1" es el nombre asignado a todos los checkbox
   if (f.colorCBX1[i].checked) {
     var useranswer = xmlDoc.createElement("useranswer");   
     useranswer.innerHTML = i+1;
     xmlDoc.getElementById("jdos_003").appendChild(useranswer);
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
      notaCheckbox1 +=1.0/respuestasCheckbox1.length;
      nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
        
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
    }
    } 
  }
   /* if (notaCheckbox1 != 1 & notaCheckbox1 !=0){
      darRespuestaHtml("P3: Semicorrecta"); 
    }else  if(notaCheckbox1 == 0){
      darRespuestaHtml("P3: Incorrecta")
    }else   darRespuestaHtml("P3: Correcta");   */    
}

function corregirCheckbox2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta2 = [];
  var notaCheckbox2 = 0;
  for (i = 0; i < f.colorCBX2.length; i++) {  //"colorCBX2" es el nombre asignado a todos los checkbox
   if (f.colorCBX2[i].checked) {
     var useranswer = xmlDoc.createElement("useranswer");   
     useranswer.innerHTML = i+1;
     xmlDoc.getElementById("jdos_004").appendChild(useranswer);
    escorrecta2[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta2[i]=true;
    }
    if (escorrecta2[i]) {
      notaCheckbox2 +=1.0/respuestasCheckbox2.length;
      nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
        
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
    }
    } 
  }
    /*if (notaCheckbox2 != 1 & notaCheckbox2 !=0){
      darRespuestaHtml("P4: Semicorrecta"); 
    }else  if(notaCheckbox2 == 0){
      darRespuestaHtml("P4: Incorrecta")
    }else   darRespuestaHtml("P4: Correcta");*/
         
}
    
   /* if (escorrecta2[i]) {
      notaCheckbox2 +=1.0/respuestasCheckbox2.length;
      nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P4: "+i+" Correcta");    
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P4: "+i+" Incorrecta");
    }*/

function corregirNumber1(){ 
  //var s = formElement.elements[4].value;  
  var s=document.getElementById("num1").value;     
    if (s==numeroSecreto1) {
      darRespuestaHtml("P5: Correcta");
      nota +=1;
    }
    else {
      if (s>numeroSecreto1) darRespuestaHtml("P5: Te has pasado");
      else darRespuestaHtml("P5: Te has quedado corto");
    }
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = s;
    xmlDoc.getElementById("jdos_005").appendChild(useranswer);
}

function corregirNumber2(){
  //var s = formElement.elements[5].value;    
  var s = document.getElementById("num2").value;
    if (s==numeroSecreto2) {
    darRespuestaHtml("P6: Correcta");
    nota +=1;
    }
    else {
      if (s>numeroSecreto2) darRespuestaHtml("P6: Te has pasado");
      else darRespuestaHtml("P6: Te has quedado corto");
    }
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = s;
    xmlDoc.getElementById("jdos_006").appendChild(useranswer);
  }

function corregirSelect1(){
  //var sel = formElement.elements[6]; 
  var sel = document.getElementById("sel1");  
    if (sel.selectedIndex-1==respuestaSelect1) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   // darRespuestaHtml("P7: Correcta");
    nota +=1;
    }
   // else darRespuestaHtml("P7: Incorrecta");
    /*var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = sel.selectedIndex;
  xmlDoc.getElementById("profe_007").appendChild(useranswer);*/
}
function corregirSelect2(){
  //var sel = formElement.elements[6]; 
  var sel = document.getElementById("sel2");  
    if (sel.selectedIndex-1==respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
    //darRespuestaHtml("P8: Correcta");
    nota +=1;
    }
   // else darRespuestaHtml("P8: Incorrecta");
    /*var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = sel.selectedIndex;
  xmlDoc.getElementById("profe_008").appendChild(useranswer);*/
}
// Corregir Select multiple  

function corregirSelectMultiple1(){
	//var f = formElement;
	var escorrecta = [];
	var multiple = document.getElementById("selM1");
	var puntuacion = 0;
	for (var i = 0; i<multiple.length; i ++){
		if (multiple[i].selected){
			for (var j = 0; j<respuestasMultiple1.length; j++){
				if (i == respuestasMultiple1[j]){
					escorrecta.push(multiple[i].value);
				}
			}
		}
	}
	if (escorrecta.length > 0){
		puntuacion = escorrecta.length / respuestasMultiple1.length;
		nota += puntuacion;
	}
	if (puntuacion != 1 & puntuacion != 0){
		darRespuestaHtml("P9: Semicorrecta")
	} else if (puntuacion == 0){
		darRespuestaHtml("P9: Incorrecta");
	}else darRespuestaHtml("P9: Correcta")
}

function corregirSelectMultiple2(){
	//var f = formElement;
	var escorrecta = [];
	var multiple = document.getElementById("selM2");
	var puntuacion = 0;
	for (var i = 0; i<multiple.length; i ++){
		if (multiple[i].selected){
			for (var j = 0; j<respuestasMultiple2.length; j++){
				if (i == respuestasMultiple2[j]){
					escorrecta.push(multiple[i].value);
				}
			}
		}
	}
	if (escorrecta.length > 0){
		puntuacion = escorrecta.length / respuestasMultiple2.length;
		nota += puntuacion;
	}
	if (puntuacion != 1 & puntuacion != 0){
		darRespuestaHtml("P10: Semicorrecta")
	} else if (puntuacion == 0){
		darRespuestaHtml("P10: Incorrecta");
	}else darRespuestaHtml("P10: Correcta")
}

//****************************************************************************************************
// poner los datos recibios en el HTML
 function ponerDatosRadio1Html(t,nodes){
  var radioContainer=document.getElementById('radioDiv1');
  document.getElementById('tituloRadio1').innerHTML = t;
  //for (i = 0; i < opt.length; i++) { 
  var result = nodes.iterateNext();
  i=0;
  while (result) {   
      var input = document.createElement("input");
      var label = document.createElement("label");
      //label.innerHTML=opt[i];
      label.innerHTML = result.innerHTML;
      label.setAttribute("for", "colorR1_"+i);
      input.type="radio";
      input.name="colorR1";
      input.id="colorR1_"+i;;    
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement("br"));
      result = nodes.iterateNext();
  }  
 }
 function ponerDatosRadio2Html(t,nodes){
  var radioContainer=document.getElementById('radioDiv2');
  document.getElementById('tituloRadio2').innerHTML = t;
  //for (i = 0; i < opt.length; i++) { 
  var result = nodes.iterateNext();
  i=0;
  while (result) {    
      var input = document.createElement("input");
      var label = document.createElement("label");
      //label.innerHTML=opt[i];
      label.innerHTML = result.innerHTML;
      label.setAttribute("for", "colorR2_"+i);
      input.type="radio";
      input.name="colorR2";
      input.id="colorR2_"+i;;    
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement("br"));
      result = nodes.iterateNext();
  }  
 }

 function ponerDatosCheckbox1Html(t,nodes){
  var checkboxContainer=document.getElementById('checkboxDiv1');
  document.getElementById('tituloCheckbox1').innerHTML = t;
  //for (i = 0; i < opt.length; i++) { 
  var result = nodes.iterateNext();
  i=0;
  while (result) {  
      var input = document.createElement("input");
      var label = document.createElement("label");
      //label.innerHTML=opt[i];
      label.innerHTML = result.innerHTML;
      label.setAttribute("for", "colorCBX1_"+i);
      input.type="checkbox";
      input.name="colorCBX1";
      input.id="colorCBX1_"+i;;    
      checkboxContainer.appendChild(input);
      checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(document.createElement("br"));
      result = nodes.iterateNext();
  }  
 }

  function ponerDatosCheckbox2Html(t,nodes){
    var checkboxContainer=document.getElementById('checkboxDiv2');
    document.getElementById('tituloCheckbox2').innerHTML = t;
    //for (i = 0; i < opt.length; i++) { 
    var result = nodes.iterateNext();
    i=0;
    while (result) {  
        var input = document.createElement("input");
        var label = document.createElement("label");
        //label.innerHTML=opt[i];
        label.innerHTML = result.innerHTML;
        label.setAttribute("for", "colorCBX2_"+i);// si no funciona cambiar a color1
        input.type="checkbox";
        input.name="colorCBX2";
        input.id="colorCBX2_"+i;;    
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
        result = nodes.iterateNext();
    }  
  }

  function ponerDatosInput1Html(t){
    document.getElementById("tituloInput1").innerHTML = t;
  }

  function ponerDatosInput2Html(t){
    document.getElementById("tituloInput2").innerHTML = t;
  }
  

  function ponerDatosSelect1Html(t,nodes){
    document.getElementById("tituloSelect1").innerHTML=t;
    var select = document.getElementsByTagName("select")[0];
    //for (i = 0; i < opt.length; i++) { 
    var result = nodes.iterateNext();
    i=0;
    while (result) {  
      var option = document.createElement("option");
      option.text = result.innerHTML;
      option.value=i+1;
      select.options.add(option);
      result = nodes.iterateNext();
   }  
  }

  function ponerDatosSelect2Html(t,nodes){
    document.getElementById("tituloSelect2").innerHTML=t;
    var select = document.getElementsByTagName("select")[1];
    var result = nodes.iterateNext();
    i=0;
    while (result) {
      var option = document.createElement("option");
      option.text = result.innerHTML;
      option.value=i+1;
      select.options.add(option);
      result = nodes.iterateNext();
    }  
  }

  function ponerDatosSelectMultiple1Html(t,nodes){
    document.getElementById("selectMultiple1").innerHTML=t;
    var selectMultiple1 = document.getElementsByTagName("select")[2];
    var result = nodes.iterateNext();
    i=0;
    while (result) {
      var option = document.createElement("option");
      option.text = result.innerHTML;
      option.value=i+1;
      selectMultiple1.options.add(option);
      result = nodes.iterateNext();
    }   
  }

  function ponerDatosSelectMultiple2Html(t,nodes){
    document.getElementById("selectMultiple2").innerHTML=t;
    var selectMultiple2 = document.getElementsByTagName("select")[3];
    var result = nodes.iterateNext();
    i=0;
    while (result) {
      var option = document.createElement("option");
      option.text = result.innerHTML;
      option.value=i+1;
      selectMultiple2.options.add(option);
      result = nodes.iterateNext();
    }  
  }

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
 //document.getElementById('resultadosDiv').style.display = "block";
}
function presentarNota(){   
   document.getElementById('resultadosDiv').style.display = "block";
   //Código transformación xslt con xmlDoc y xslDoc
   if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);
        resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.getElementById('resultadosDiv').appendChild(resultDocument);
   }
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
   //bloquear formulario (recargar para volver a empezar)
   var f=formElement;
   var e = f.elements;
   for (var i = 0, len = e.length; i < len; ++i) {
    e[i].disabled = true;
   }
}

/*function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}*/

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}


//Comprobar que se han introducido datos en el formulario
function comprobar(){
	var f=formElement;
	var checked=false;
  var checked1=false;
  var checked2=false;
  var checked3=false;
  	
	for (i = 0; i < f.colorR1.length; i++) {
		if (f.colorR1[i].checked) checked=true;
  }
  for (i = 0; i < f.colorR2.length; i++) {
		if (f.colorR2[i].checked) checked1=true;
	}
  for (i = 0; i < f.colorCBX1.length; i++) {
		if (f.colorCBX1[i].checked) checked2=true;
	}
  for (i = 0; i < f.colorCBX2.length; i++) {
		if (f.colorCBX2[i].checked) checked3=true;
	}
  if(!checked){
    alert("Selecciona una opción de la pregunta 1.");
    document.getElementsByTagName("h3")[0].scrollIntoView();    
    return false;
  } else if (!checked1){
    alert("Selecciona una opción de la pregunta 2.");
    document.getElementsByTagName("h3")[1].scrollIntoView();    
    return false;
  } else if (!checked2){
    alert("Selecciona una opción de la pregunta 3.");
    document.getElementsByTagName("h3")[2].scrollIntoView();    
    return false;
  } else if (!checked3){
    alert("Selecciona una opción de la pregunta 4.");
    document.getElementsByTagName("h3")[3].scrollIntoView();    
    return false;  
  } else if (document.getElementById("num1").value == ""){
    alert("Introduzca un número en la pregunta 5.");
    document.getElementsByTagName("h3")[4].scrollIntoView();    
    return false; 
  } else if (document.getElementById("num2").value == ""){
    alert("Introduzca un número en la pregunta 6.");
    document.getElementsByTagName("h3")[5].scrollIntoView();    
    return false;      
  } else if (document.getElementById("sel1").selectedIndex==0){
    alert("Selecciona una opción de la pregunta 7.");
    document.getElementsByTagName("h3")[6].scrollIntoView();    
    return false;    
  } else if (document.getElementById("sel2").selectedIndex==0){
    alert("Selecciona una opción de la pregunta 8.");
    document.getElementsByTagName("h3")[7].scrollIntoView();    
    return false;   
  } else if (document.getElementById("selM1").selectedIndex==-1){
    alert("Selecciona una opción de la pregunta 9.");
    document.getElementsByTagName("h3")[8].scrollIntoView();    
    return false;    
  } else if (document.getElementById("selM2").selectedIndex==-1){
    alert("Selecciona una opción de la pregunta 10.");
    document.getElementsByTagName("h3")[9].scrollIntoView();    
    return false;   
  } else return true;
}


