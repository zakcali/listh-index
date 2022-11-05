const { ipcRenderer } = require('electron')
const researcherIdsArea = document.querySelector ('#researcherIds');
const findBtn = document.querySelector ('#find');
const saveBtn = document.querySelector ('#save');
const infoText = document.querySelector ('#infoTextOutput');

findBtn.addEventListener('click', async () => {
infoText.innerHTML = '' // delete any previous information about row counts
let	areaText='URL\tResearcherID\tH-index\tCitations\tPapers\t2022\t2021'
+'\t2020\t2019\t2018\t2017\t2016\t2015\t2014\t2013\t2012\t2011\t2010\t2009\t2008\t2007\t2006\t2005\t2004\t2003\t2002\t2001'
+'\t2000\t1999\t1998\t1997\t1996\t1995\t1994\t1993\t1992\t1991\t1990\t1989\t1988\t1987\t1986\t1985\t1984\t1983\t1982\t1981'
+'\t1980\t1979\t1978\t1977\t1976\t1975\t1974\t1973\t1972\t1971\t1970\t1969\t1968\t1967\t1966\t1965\t1964\t1963\t1962\t1961'

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

