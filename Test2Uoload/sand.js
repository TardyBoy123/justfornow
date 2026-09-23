/* Bounded cellular simulation; pointer input supports mouse, pen, and touch. */
(() => {
 const canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d');
 let size=2,n=200,grid=new Float32Array(n*n),hue=235,hueSpeed=1,amount=3,drawing=false,x=200,y=50,burst=0,frame=0;
 const cat=new Image();cat.src='cate.jpg';
 function clear(){grid=new Float32Array(n*n);}
 document.querySelector('#grainSize').oninput=e=>{size=Number(e.target.value);n=Math.floor(canvas.width/size);clear();document.querySelector('#grainSizeValue').textContent=size+' px';};
 document.querySelector('#hueSpeed').oninput=e=>{hueSpeed=Number(e.target.value);document.querySelector('#hueSpeedValue').textContent=hueSpeed;};
 document.querySelector('#spawnAmount').oninput=e=>{amount=Number(e.target.value);document.querySelector('#spawnAmountValue').textContent=amount;};
 document.querySelector('#clearCanvas').onclick=()=>{burst=0;clear();};document.querySelector('#drop-sand').onclick=()=>{x=200;y=35;burst=40;};
 function position(e){const rect=canvas.getBoundingClientRect();x=(e.clientX-rect.left)*canvas.width/rect.width;y=(e.clientY-rect.top)*canvas.height/rect.height;}
 canvas.onpointerdown=e=>{canvas.setPointerCapture(e.pointerId);drawing=true;position(e);};canvas.onpointermove=e=>{if(drawing)position(e);};canvas.onpointerup=canvas.onpointercancel=canvas.onlostpointercapture=()=>{drawing=false;};
 function draw(){
  frame=0;if(document.hidden)return;
  if(drawing||burst>0){const cx=Math.floor(x/size),cy=Math.floor(y/size);for(let i=0;i<amount*3;i++){const xx=cx+Math.floor((Math.random()-.5)*(amount+3)),yy=cy+Math.floor((Math.random()-.5)*4);if(xx>=0&&xx<n&&yy>=0&&yy<n)grid[yy*n+xx]=hue;}hue=(hue+hueSpeed*.08)%360||1;if(burst)burst--;}
  // Bottom-up in-place moves cannot collide or update one grain twice.
  for(let yy=n-2;yy>=0;yy--){const reverse=Math.random()<.5;for(let j=0;j<n;j++){const xx=reverse?n-1-j:j,index=yy*n+xx;if(!grid[index])continue;let next=index+n;const dir=Math.random()<.5?-1:1;if(grid[next]){if(xx+dir>=0&&xx+dir<n&&!grid[next+dir])next+=dir;else if(xx-dir>=0&&xx-dir<n&&!grid[next-dir])next-=dir;else continue;}grid[next]=grid[index];grid[index]=0;}}
  ctx.clearRect(0,0,400,400);if(document.querySelector('#backgroundImage').checked&&cat.complete&&cat.naturalWidth)ctx.drawImage(cat,0,0,400,400);
  for(let i=0;i<grid.length;i++)if(grid[i]){ctx.fillStyle=`hsl(${grid[i]},55%,55%)`;ctx.fillRect((i%n)*size,Math.floor(i/n)*size,size,size);}
  frame=requestAnimationFrame(draw);
 }
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!frame)draw();});draw();
})();
