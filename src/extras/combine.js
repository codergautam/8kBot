module.exports =(name1,name2) => {
const vowels = ['a','e','i','o','u','y'];
	var count1=-1,count2=-1;
	var mid1 = Math.ceil(name1.length/2)-1;
	var mid2 = Math.ceil(name2.length/2)-1;
	var noVowel1=false,noVowel2=false;
	for(i=mid1;i>=0;i--){
		count1++;
		if(vowels.includes(name1.charAt(i).toLowerCase())){
			i = -1;
		}else if(i==0){
			noVowel1=true;
		}
	}
	for(i=mid2;i<name2.length;i++){
		count2++;
		if(vowels.includes(name2.charAt(i).toLowerCase())){
			i = name2.length;
		}else if(i==name2.length-1){
			noVowel2=true;
		}
	}

	var name = "";
	if(noVowel1&&noVowel2){
		name = name1.substring(0,mid1+1);
		name += name2.substring(mid2);
	}else if(count1<=count2){
		name = name1.substring(0,mid1-count1+1);
		name += name2.substring(mid2);
	}else{
		name = name1.substring(0,mid1+1);
		name += name2.substring(mid2+count2);
	}
	return name;
}