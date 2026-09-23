/* Lightweight orbital linework. The camera follows page position, not a video. */
(() => {
 const canvas=document.querySelector('#universe'),ctx=canvas.getContext('2d');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let w=0,h=0,raf=0,phase=0;
 let midnight=false;
 const rgb=()=>midnight?'186,162,234':'87,69,127';
 function size(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw();}
 function line(points,alpha=.35,width=1){ctx.strokeStyle=`rgba(${rgb()},${alpha})`;ctx.lineWidth=width;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();}
 function draw(){
  const p=reduced.matches?0:(window.jfnProgress||0);ctx.clearRect(0,0,w,h);
  const mobile=w<750;
  const cx=w*(mobile?.72:.73)+Math.sin(p*1.6)*w*.12;
  const cy=h*(.4+.13*Math.sin(p*1.4));
  const r=Math.min(w,h)*(.34+.12*Math.sin(p*1.1));
  const spin=p*.85+phase;
  const trigger=document.querySelector('#orbit-trigger');
  if(trigger){trigger.style.left=(cx-r)+'px';trigger.style.top=(cy-r)+'px';trigger.style.width=(r*2)+'px';trigger.style.height=(r*2)+'px';}
  // Spherical latitude and longitude grid, projected and tilted in 3D.
  function project(x,y,z){
   let a=x*Math.cos(spin)+z*Math.sin(spin),b=-x*Math.sin(spin)+z*Math.cos(spin);
   const tilt=.3+p*.13;const yy=y*Math.cos(tilt)-b*Math.sin(tilt),zz=y*Math.sin(tilt)+b*Math.cos(tilt);
   const perspective=1/(1+zz*.17);return[cx+a*r*perspective,cy+yy*r*perspective];
  }
  for(let i=0;i<9;i++){let pts=[];for(let j=0;j<=100;j++){const t=j/100*Math.PI*2;const a=i/9*Math.PI;pts.push(project(Math.cos(t)*Math.cos(a),Math.sin(t),Math.cos(t)*Math.sin(a)));}line(pts,.22,.8);}
  for(let i=-3;i<=3;i++){const y=i/4,rr=Math.sqrt(1-y*y),pts=[];for(let j=0;j<=100;j++){const t=j/100*Math.PI*2;pts.push(project(Math.cos(t)*rr,y,Math.sin(t)*rr));}line(pts,.21,.8);}
  // Eccentric orbits sweep across the viewport as the scroll camera moves.
  for(let k=0;k<3;k++){
   ctx.save();ctx.translate(cx,cy);ctx.rotate(-.45+k*.8+p*.3);
   ctx.strokeStyle=`rgba(${rgb()},${k===0?.43:.22})`;ctx.lineWidth=k===0?1.2:.7;
   ctx.beginPath();ctx.ellipse(0,0,r*(1.55+k*.25),r*(.38+k*.17),0,0,Math.PI*2);ctx.stroke();
   const t=spin+k*2;const x=Math.cos(t)*r*(1.55+k*.25),y=Math.sin(t)*r*(.38+k*.17);
   ctx.fillStyle=midnight?'#d1baf8':'#685584';ctx.beginPath();ctx.arc(x,y,k===0?4:2,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  // Relay cone and concentric radio rings, echoing the supplied motion reference.
  const bx=w*(.15+.08*Math.sin(p)),by=h*.85,rr=r*.65;
  ctx.save();ctx.globalAlpha=.4;
  for(let i=1;i<=4;i++){ctx.strokeStyle=midnight?'#ad94d6':'#8c7caa';ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(bx,by,rr*i*.5,rr*i*.13,-.2,0,Math.PI*2);ctx.stroke();}
  line([[bx-rr*.4,by],[bx,by-rr*1.4],[bx+rr*.4,by]],.5,.8);
  ctx.restore();
  ctx.font='9px "Courier New",monospace';ctx.fillStyle=midnight?'#b5a4ce':'#837494';ctx.fillText('JFN / ORBIT '+(p+1).toFixed(2),Math.max(20,cx-r),cy+r+25);
 }
 function loop(){raf=0;if(document.hidden||reduced.matches)return;phase+=.0007;draw();raf=requestAnimationFrame(loop);}
 function start(){if(!raf&&!reduced.matches&&!document.hidden)raf=requestAnimationFrame(loop);else draw();}
 function theme(){midnight=document.documentElement.dataset.theme==='midnight';draw();}
 addEventListener('jfn-theme',theme);midnight=document.documentElement.dataset.theme==='midnight';
 addEventListener('resize',size);addEventListener('jfn-scroll',()=>{if(reduced.matches)draw();});
 document.addEventListener('visibilitychange',start);reduced.addEventListener('change',start);size();start();
})();
