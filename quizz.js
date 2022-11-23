const ui=new UIM;

function startVer(){
    
    ui.btnStart.classList.add("d-none");
    document.getElementById("cardID").classList.add("active");
    ui.nextButton.classList.remove("opacity-0");
    document.getElementById("sayac").classList.remove("gizlen");
    ui.show(sınav.sorugetir());
    
}

function Puiz(id,soruMetni,secenekler, dogruCevap,isAnswered,isCorrect,firstAnswered){
    this.id=id;
    this.soruMetni=soruMetni;
    this.secenekler=secenekler;
    this.dogruCevap=dogruCevap;
    this.isAnswered=isAnswered;
    this.isCorrect=isCorrect;
    this.firstAnswered=firstAnswered;
}

let sorular=[
    new Puiz(1,"1-Aşağıdakilerden hangisi Karadeniz Bölgesinde değildir?",{a:"İzmir",b:"Trabzon", c:"Rize", d:"Giresun"},"a",false,"none","firstAnswered"),
    new Puiz(2,"2-Aşağıdakilerden hangisi Ege Bölgesinde değildir?",{a:"İzmir",b:"Manisa", c:"Uşak", d:"Giresun"},"d",false,"none","firstAnswered"),
    new Puiz(3,"3-Aşağıdakilerden hangisi Marmara Bölgesinde değildir?",{a:"İstanbul",b:"Edirne", c:"Ankara", d:"Kocaeli"},"c",false,"none","firstAnswered"),
    new Puiz(4,"4-Aşağıdakilerden hangisi Marmara Bölgesindedir?",{a:"Kastamonu",b:"İzmit", c:"Trabzon", d:"Giresun"},"b",false,"none","firstAnswered")
] 

Puiz.prototype.cevapKontrol=function(cvp){
    return cvp===this.dogruCevap;
}

function Quizim(sorular){
        this.soruNumarası=0;
        this.soruAdeti=sorular.length;
        this.dogru=0;
}

Quizim.prototype.sorugetir=function() {
    return sorular[this.soruNumarası];
}

Quizim.prototype.sınavBitir=function(){
    window.location.reload();
    //TODO: Vaybe bunu bilmiyordum...
}

Quizim.prototype.sınavGoster=function(){
    ui.cardID.classList.remove("d-none");
    ui.sinavBitti.classList.add("d-none");
    ui.sayac.classList.remove("d-none");
}

const sınav=new Quizim(sorular);

let s=0;

let strom;
function next(){
    this.zama.style.width=String(0)+"%";
    sınav.soruNumarası++;
   // ui.zaman.innerHTML="";
    
    if(sınav.soruNumarası<sınav.soruAdeti){
    
    ui.show(sınav.sorugetir());
    for(k of document.querySelectorAll(".list-style-item")){
            k.classList.remove("correct");
            k.classList.remove("incorrect");
            k.children[1].classList.remove("fa-check");
            k.children[1].classList.remove("fa-close");
     }
    }
    else{
        ui.cardID.classList.add("d-none");
        ui.sinavBitti.classList.remove("d-none");
        ui.crown.classList.add("active");
        ui.sayac.classList.add("d-none");
        ui.sonucuVer(sınav.dogru,sınav.soruAdeti);

    }
    ui.nextButton.classList.add("gizlen");
}

function cevaplaDostu(madde){
    ui.durdur();
    let cvp=madde.querySelector("span").id;
    let iconu=madde.querySelector("i");
    let isCorrect="none"; 
    ui.nextButton.classList.remove("gizlen");
    if(ui.birsik==true){            
    if(sorular[sınav.soruNumarası].cevapKontrol(cvp)){
                
        madde.classList.add("correct");
        iconu.classList.add("fa-check");

        if(sorular[sınav.soruNumarası].isAnswered==false)
        {
            sorular[sınav.soruNumarası].firstAnswered=cvp;
            sınav.dogru+=1;
           
        }
       
        }
        else{
            madde.classList.add("incorrect");
            iconu.classList.add("fa-close");

            if(sorular[sınav.soruNumarası].isAnswered==false)
            {
                sorular[sınav.soruNumarası].firstAnswered=cvp;
                sorular[sınav.soruNumarası].isCorrect="no";
            }
        }
        sorular[sınav.soruNumarası].isAnswered=true;
       
        
}
ui.birsik=false;
//Bununla sadece bir şıkka basılmasını sağlıyorum..

}
ui.adet.innerHTML=sınav.soruAdeti;
function cevaplandimi(){
    sorular[sınav.soruNumarası]
}

function tekrarla(){
    ui.crown.classList.remove("active");
    sınav.sınavGoster();
    for(i of sorular){
        i.isAnswered=false;
        i.isCorrect="none"
        i.firstAnswered="firstAnswered";

    }
    sınav.soruNumarası=0;
    sınav.dogru=0;
    
    
    ui.show(sınav.sorugetir());
}
function bitir(){
    sınav.sınavBitir();

}