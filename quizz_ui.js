// function ui(k){
//     return document.getElementById(k);
// }

function UIM(){
   
    this.btnStart=document.querySelector("#startButon"),
    this.nextButton=document.getElementById("next"),
    this.cardID=document.getElementById("cardID"),
    this.sinavBitti=document.getElementById("sinavBitti"),
    this.ulList=document.getElementById("ulList"),
    this.li=document.querySelector("#ulList li"),
    this.soruMetni=document.getElementById("soruMetni"),
    this.sayac=document.getElementById("sayac"),
    this.bosolmayanlar=document.querySelectorAll(".list-style-item:not(.bos)"),
    this.no=document.getElementById("no"),
    this.adet=document.getElementById("adet"),
    this.sol=document.getElementById("solYukaridaki"),
    this.dogru=document.getElementById("dogru"),
    this.crown=document.getElementById("crown"),
    this.toplamSoru=document.getElementById("toplamSoru"),
    this.tag=document.getElementById("tag"),
    this.zaman=document.getElementById("zaman"),
    this.zama=document.getElementById("zama")
}
//var timeLeft=10;
var dogruCev;

UIM.prototype.show=function(soru){
    dogruCev=soru.dogruCevap;
    this.secenekSayisi;
    this.birsik=true;
    this.ulList.innerHTML="";
    this.soruMetni.innerHTML=soru.soruMetni;
    this.cevaplandi=false;
        for(i in soru.secenekler){
            let m=`<li class="list-style-item text-underline-none d-flex my-2 p-1 bg-light" onclick="cevaplaDostu(this)">
                <span id=${i}>${i} : ${soru.secenekler[i]}</span>
                <i class="fa p-2"></i>`
           this.ulList.insertAdjacentHTML("beforeend",m);
       }

   let r=Object.keys(soru.secenekler).length;
   
//    Aşağıdaki kodlarda seçeneklerin altına boş satırlar ekliyoruz.
    for (let i = r; i < 4; i++) { 
    let k=`<li class="bos list-style-item text-underline-none d-flex my-2 p-1 bg-light" >
        <span class="bos" id="bos"></span>
        <i class="fa p-2"></i>
        </li>`
   this.ulList.insertAdjacentHTML("beforeend",k);
   //this.durdur();
}

this.sny(100);
this.no.innerHTML=soru.id;
}

// UIM.prototype.saniyeHesapla=function(){  
//     if(timeLeft>0){
//         setInterval(this.saniyeHesapla,1000); }  
//         else{
//             clearInterval(UIM.saniyeHesapla());
//         }
  
//     this.timeLeft-=1;
//     this.zaman.innerHTML=this.timeLeft;
//     console.log(this.timeLeft);
   // this.no.innerHTML=soru.id;
    
// }




// function show(){
//     ui.ulList.innerHTML="";
//     ui.soruMetni.innerHTML=sorular[s].soruMetni;
    
//         for(i in sorular[s].secenekler){
//             let m=`<li class="list-style-item text-underline-none d-flex my-2 p-1 bg-light" >
//                 <span id=${i}>${i} : ${sorular[s].secenekler[i]}</span>
//                 <i class="fa p-2"></i>`
//            ui.ulList.insertAdjacentHTML("beforeend",m);
//        }

//    let r=Object.keys(sorular[s].secenekler).length;
   
// //    Aşağıdaki kodlarda seçeneklerin altına boş satırlar ekliyoruz.
//     for (let i = r; i < 4; i++) { 
//     let k=`<li class="bos list-style-item text-underline-none d-flex my-2 p-1 bg-light" >
//         <span class="bos" id="bos"></span>
//         <i class="fa p-2"></i>
//         </li>`
//    ui.ulList.insertAdjacentHTML("beforeend",k);
   
// }
// for(let k of document.querySelectorAll(".list-style-item:not(.bos)")){
//     k.setAttribute("onclick", "cevaplaDostu(this)");
//     }
//     birsik=true;
//     ui.sayac.innerHTML=(s+1)+"/"+sorular.length;
// }
UIM.prototype.sonucuVer=function(dogrusoruSayısı,toplamSoru){

    let tag=`Toplam ${toplamSoru} sorudan ${dogrusoruSayısı} tanesini doğru cevapladınız.`;
    this.tag.innerHTML=tag;

}
var saniyeHesapla="";
UIM.prototype.sny=function(timeLeft){
    let h=0;
    saniyeHesapla=setInterval(function(){
        // let length=(11-timeLeft)*50;
        let length=h*1;
        this.zama.style.width=length+"%";
        timeLeft-=1;
        if(timeLeft<=0){
           clearInterval(saniyeHesapla);
           for(i of this.ulList.children){
            if(i.querySelector("span").id==dogruCev){
                i.classList.add("correct");
                i.querySelector("i").classList.add("fa-check");
            }
            else if(i.querySelector("span").id!="bos"){
                i.classList.add("incorrect");
                i.querySelector("i").classList.add("fa-close");
            }
            i.classList.add("disabled");
           }
           document.getElementById("next").classList.remove("gizlen");
        }
        this.zaman.innerHTML=Math.round(timeLeft/10);
        h++;
    },100)
}

UIM.prototype.durdur=function(){
    clearInterval(saniyeHesapla);
}

