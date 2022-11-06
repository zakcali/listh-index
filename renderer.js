const { ipcRenderer } = require('electron')
const researcherIdsArea = document.querySelector ('#researcherIds');
const findBtn = document.querySelector ('#find');
const saveBtn = document.querySelector ('#save');
const infoText = document.querySelector ('#infoTextOutput');
const today = new Date();
const yyyy = today.getFullYear();

findBtn.addEventListener('click', async () => {
infoText.innerHTML = '' // delete any previous information about row counts
let	areaText='URL\tResearcherID\tH-index\tCitations\tPapers'
for (let i=yyyy; i>1960; i--) {
	areaText=areaText+'\t'+i;
}
const ridText = researcherIdsArea.value
const ridArray = ridText.replace(/[^\x00-\x7F]/g,'').replace(/\r\s/g, '').split('\n'); // text to array
let i=0;
for (let ele of ridArray ) {
	if (ele !=='') {
	ipcresult = await ipcRenderer.invoke('checkHindex', ele.replace(/\s/g, '').trim().toUpperCase()); 
	areaText=areaText+'\n'+ipcresult;
	researcherIdsArea.value=areaText;
	i++;
	infoText.innerHTML = i;
	}
}
infoText.innerHTML = 'Number of authors calculated for = '+i;

});

saveBtn.addEventListener('click', async () => {
const	ipcresult = await ipcRenderer.invoke('save', researcherIdsArea.value); 
	});
