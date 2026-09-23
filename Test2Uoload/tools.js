/* Shared channel behavior. No build step, external dependencies, or autoplay. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s), tool=document.body.dataset.tool;
 if(new URLSearchParams(location.search).has('embedded'))document.body.classList.add('embedded');
 addEventListener('keydown',e=>{if(e.key==='Escape'&&window.parent!==window)window.parent.postMessage('jfn-close',location.origin);});
 document.querySelectorAll('audio,video').forEach(media=>media.addEventListener('play',()=>document.querySelectorAll('audio,video').forEach(other=>{if(other!==media)other.pause();})));
 if(tool==='character-counter'){
  function count(){const text=$('#textInput').value;$('#charCount').textContent=text.length;$('#wordCount').textContent=text.trim()?text.trim().split(/\s+/u).length:0;$('#noSpaces').textContent=text.replace(/\s/gu,'').length;}
  $('#textInput').oninput=count;$('#clear-text').onclick=()=>{$('#textInput').value='';count();$('#textInput').focus();};
 }
 if(tool==='gpa-calculator'){
  let serial=0;
  function row(){serial++;const tr=document.createElement('tr');tr.innerHTML=`<td><input aria-label="Course ${serial}" placeholder="Course"></td><td><input aria-label="Grade ${serial}" type="number" min="0" max="100" step="any" required placeholder="0–100"></td><td><select aria-label="Weight ${serial}"><option value="1">1.0</option><option value="0.5">0.5</option></select></td><td><button type="button" aria-label="Remove course ${serial}">✕</button></td>`;tr.querySelector('button').onclick=()=>{tr.remove();$('#gpa-result').textContent='Courses changed. Calculate again to update your GPA.';};$('#courseTable').append(tr);}
  row();$('#addRow').onclick=row;
  $('#gpa-form').onsubmit=e=>{e.preventDefault();let points=0,weight=0;const scale=[[90,4],[85,3.9],[80,3.7],[77,3.3],[73,3],[70,2.7],[67,2.3],[63,2],[60,1.7],[57,1.3],[53,1],[50,.7],[0,0]];
   $('#courseTable').querySelectorAll('tr').forEach(tr=>{const grade=Number(tr.querySelector('input[type=number]').value),w=Number(tr.querySelector('select').value);points+=scale.find(([threshold])=>grade>=threshold)[1]*w;weight+=w;});
   $('#gpa-result').textContent=weight?`Your GPA is ${(points/weight).toFixed(2)} / 4.00 · ${weight.toFixed(1)} credits`:'Add at least one course.';
  };
 }
 if(tool==='macro-calculator'){
  let meal=[];
  $('#restaurant').onchange=()=>{const select=$('#menuItem');select.replaceChildren();select.disabled=false;Object.keys(menuData[$('#restaurant').value]).forEach(name=>select.add(new Option(name,name)));};
  function render(){const list=$('#mealList');list.replaceChildren();let calories=0,protein=0;meal.forEach((food,i)=>{calories+=food.calories;protein+=food.protein;const li=document.createElement('li'),text=document.createElement('span'),small=document.createElement('small'),remove=document.createElement('button');text.textContent=food.item;small.textContent=`${food.calories} calories · ${food.protein.toFixed(2)}g protein · ×${food.servings}`;text.append(small);remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+food.item);remove.onclick=()=>{meal.splice(i,1);render();};li.append(text,remove);list.append(li);});if(!meal.length)list.innerHTML='<li>No items yet.</li>';$('#calories').textContent=calories.toLocaleString();$('#protein').textContent=protein.toFixed(2);}
  $('#macro-form').onsubmit=e=>{e.preventDefault();const restaurant=$('#restaurant').value,item=$('#menuItem').value,servings=Number($('#servings').value);if(!menuData[restaurant]?.[item]||!Number.isInteger(servings)||servings<1)return;const food=menuData[restaurant][item];meal.push({item,servings,calories:food.calories*servings,protein:food.protein*servings});render();};
  $('#clear-meal').onclick=()=>{meal=[];render();};
 }
 if(tool==='number-game'){
  let answer,attempts,won;function reset(){answer=Math.floor(Math.random()*100)+1;attempts=0;won=false;$('#guessInput').value='';$('#guessInput').disabled=false;$('#guess-form button[type=submit]').disabled=false;$('#guess-result').textContent='Follow a hunch.';$('#attempts').textContent='0 attempts';}
  reset();$('#reset-game').onclick=reset;
  $('#guess-form').onsubmit=e=>{e.preventDefault();const n=Number($('#guessInput').value);if(won||!Number.isInteger(n)||n<1||n>100)return;attempts++;won=n===answer;$('#guess-result').textContent=won?`You found it: ${answer}. It took you ${attempts} ${attempts===1?'try':'tries'}.`:n<answer?'Too low. Try a little higher.':'Too high. Try a little lower.';$('#attempts').textContent=`${attempts} ${attempts===1?'attempt':'attempts'}`;if(won){$('#guessInput').disabled=true;$('#guess-form button[type=submit]').disabled=true;}else{$('#guessInput').select();}};
 }
 if(tool==='music-player'){
  const songs=[['Lykke Li - Sex Money Feelings Die (Audio).mp3','Lykke Li — Sex Money Feelings Die'],['Poison Tree.mp3','Grouper — Poison Tree'],['Loose Cannon.mp3','Puzzle — Loose Cannon'],['Grimes - Genesis.mp3','Grimes — Genesis'],['Pink Pantheress - Pain (Official Visualiser).mp3','Pink Pantheress — Pain'],['Grimes - Oblivion (1).mp3','Grimes — Oblivion'],['anything.mp3','Adrianne Lenker — Anything']];
  let current=-1;const player=$('#audioPlayer');
  async function play(i){current=(i+songs.length)%songs.length;const selection=current;player.src=songs[current][0];$('#now-playing').textContent='Selected — '+songs[current][1];$('#songs').querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===current)));try{await player.play();if(selection===current)$('#now-playing').textContent='Now playing — '+songs[current][1];}catch(e){if(selection===current&&e.name!=='AbortError')$('#now-playing').textContent='Press play to listen — '+songs[current][1];}}
  songs.forEach((song,i)=>{const li=document.createElement('li'),button=document.createElement('button');button.textContent=song[1];button.setAttribute('aria-pressed','false');const arrow=document.createElement('span');arrow.textContent='↗';button.append(arrow);button.onclick=()=>play(i);li.append(button);$('#songs').append(li);});
  $('#next-song').onclick=()=>play(current+1);$('#previous-song').onclick=()=>play(current<0?0:current-1);player.onended=()=>play(current+1);player.onerror=()=>{$('#now-playing').textContent='This track could not load. Try another song.';};
 }
 if(tool==='typing-test'){
  const prompt='In a world where technology evolves at an unprecedented pace, the ethics of artificial intelligence pose significant dilemmas. Consider a self-driving car programmed to minimize harm. Faced with an unavoidable accident, should it prioritize the lives of its passengers over pedestrians? This moral quandary challenges utilitarian principles, questioning whether the greater good is truly served by sacrificing one for many. Furthermore, as AI becomes more autonomous, we must confront issues of accountability. When an algorithm makes a decision that results in harm, who bears responsibility—the programmer, the user, or the machine itself? Such ethical dilemmas require humanity to balance innovation with compassion, ensuring that technological advancements remain anchored in the core values of justice and empathy. Hence, thoughtful discourse is crucial in guiding ethical frameworks that govern AI development, safeguarding human dignity in the digital age.';
  let timer=0,duration,deadline;const area=$('#typed-text');
  function finish(){clearInterval(timer);area.disabled=true;$('#start-test').textContent='Try again ↗';const typed=area.value,words=typed.trim()?typed.trim().split(/\s+/).length:0;let correct=0;for(let i=0;i<typed.length;i++)if(typed[i]===prompt[i])correct++;const accuracy=typed.length?correct/typed.length:0;$('#typing-result').hidden=false;$('#typing-result').textContent=`${words} words · ${Math.round(typed.length/5/(duration/60))} WPM raw · ${Math.round(correct/5/(duration/60))} WPM adjusted · ${(accuracy*100).toFixed(1)}% character accuracy`;}
  $('#start-test').onclick=()=>{clearInterval(timer);duration=Number($('#test-time').value);deadline=performance.now()+duration*1000;area.value='';area.disabled=false;$('#typing-area').hidden=false;$('#typing-result').hidden=true;$('#text-to-type').textContent=prompt;$('#time-left').textContent=duration;$('#start-test').textContent='Restart test';area.focus();timer=setInterval(()=>{const left=Math.max(0,Math.ceil((deadline-performance.now())/1000));$('#time-left').textContent=left;if(!left)finish();},100);};
 }
 if(tool==='special-olympics'){
  function section(id){document.querySelectorAll('.sport-view').forEach(el=>el.hidden=el.id!==id);}
  document.querySelectorAll('[data-sport-section]').forEach(b=>b.onclick=()=>section(b.dataset.sportSection));
  Object.entries(sports).forEach(([key,sport])=>{const b=document.createElement('button');b.textContent=sport.title;b.onclick=()=>{const details=$('#sport-details');details.replaceChildren();const h=document.createElement('h2'),p=document.createElement('p'),h3=document.createElement('h3'),ul=document.createElement('ul'),back=document.createElement('button');h.textContent=sport.title;p.textContent=sport.text;h3.textContent='Warm-up exercises';sport.exercises.forEach(ex=>{const li=document.createElement('li');li.textContent=ex;ul.append(li);});back.textContent='← Back to sports';back.onclick=()=>{section('sports-view');b.focus();};details.append(h,p,h3,ul,back);section('sport-details');details.focus();};$('#sport-grid').append(b);});
 }
})();
