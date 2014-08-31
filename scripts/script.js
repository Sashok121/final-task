var slyders= {
	slides : document.getElementById('slyders').children,
	frame : 0,
	bars : [],
	barChenge : function(bar){		
		var barP = bar.getElementsByTagName('p');
		[].forEach.call(barP, function(valueP){
					valueP.style.display = "none"
				});
		bar.style.left = bar.position + "%";
		bar.style.height = 0;
		var timer = setInterval(function(){
			if( bar.maxHeight > parseFloat(bar.style.height)){
				bar.style.height = parseInt(parseFloat(bar.style.height) * 10 + 1)/10  + "%";
				
			}
			else{
				//bar.style.height = bar.maxHeight+"%";
				
				[].forEach.call(barP, function(valueP){
					valueP.style.display = "block"
				});				
				clearInterval(timer);
			}
			bar.getElementsByTagName('span')[0].innerText = parseInt(parseFloat(bar.style.height) /10*9)/10;
		}, 15);
		
	},
	competitorClick : function(index){
		var slide3 = document.getElementById('slyders').getElementsByClassName("slide3")[0];
		if (index == 0) {
			slide3.getElementsByClassName("competitor1")[0].style.transform = "rotate(0deg)";		
		slide3.getElementsByClassName("shalka")[0].style.top = "150px";
		slide3.getElementsByClassName("shalka")[1].style.top = "150px";
		}else{	
		slide3.getElementsByClassName("competitor1")[0].style.transform = "rotate("+9*(index)+"deg)";		
		slide3.getElementsByClassName("shalka")[0].style.top = slide3.getElementsByClassName("shalka")[0].offsetTop- index * 20 + "px";
		slide3.getElementsByClassName("shalka")[1].style.top = slide3.getElementsByClassName("shalka")[1].offsetTop+ index * 20+"px";
		}
	},
	chenge : function(lastIndex, index){
		if (lastIndex != index){
			var that = this;
			var ul = document.getElementsByTagName('ul');
			that.slides[lastIndex].style.left = 0;
			that.slides[lastIndex].style.right = 0;

			if(lastIndex < index){
				that.slides[index].style.visibility = "visible";
				that.slides[index].style.right = "-100%";
				that.slides[index].style.left = "inherit";
				
				setTimeout(function(){
					that.slides[index].style.right = 0;					
					that.slides[index].style.left = "inherit";					
					that.slides[lastIndex].style.left = "-100%";					
					that.slides[lastIndex].style.right = "inherit";
					that.slides[lastIndex].style.visibility = "hidden";					
				},10);	
						
			}
			else {	
				
				that.slides[index].style.visibility = "visible";
				that.slides[index].style.left = "-100%";
				that.slides[index].style.right = "inherit";
				
				setTimeout(function(){
					that.slides[index].style.right = "inherit";
					that.slides[index].style.left = 0;
					
					
					that.slides[lastIndex].style.right = "-100%";
					that.slides[lastIndex].style.left = "inherit";
					that.slides[lastIndex].style.visibility = "hidden";
				},1);

			}
			
			[].forEach.call(ul,function(value){
				if (value.className == 'menu') {
					value.children[index+1].classList.add('activity');
					value.children[lastIndex+1].className = '';
				}	
			});
			[].forEach.call(that.slides[index].classList,function(classlist){
				switch (classlist){
					case "slide1": {
						that.bars.forEach(function(bar){
							that.barChenge(bar);
						});	
						break;		
					}
					case 'slide2':{
						[].forEach.call(that.slides[index].getElementsByClassName("input"), function(valInput){
							[].forEach.call(valInput.getElementsByTagName("input"), function(input){
								input.value = '';
							});
						});
						break;
					}
					case 'slide3':{
						
						slyders.sup = 0;
						slyders.competitorClick(0);
					}
				} 
				 
			});		
		}
		
	}	
				
}
/*document.getElementById('slyders').getElementsByTagName('input').onclick = function(event){
	console.log("input");
}
document.getElementById('slyders').onmousedown = function(event){
	var thumbCoords = document.getElementById('slyders').getBoundingClientRect();
	var shiftX = event.pageX - thumbCoords.left;
    	document.onmousemove = function(event){
    	
  		var newLeft = event.pageX - thumbCoords.left;
  		if((newLeft-shiftX)<-100){
  			
  			if ((slyders.lastActivIndex + 1) < (slyders.slides.length)) {	  			
	  		 	slyders.chenge(slyders.lastActivIndex, slyders.lastActivIndex+1);
	  		 	document.onmousemove = document.onmouseup = null;
	  		 	slyders.lastActivIndex = slyders.lastActivIndex+1;	
  			};
  		 	
  		}
  		if((newLeft-shiftX)>100){
  		 	if ((slyders.lastActivIndex - 1) >=  0) {	  			
	  		 	slyders.chenge(slyders.lastActivIndex, slyders.lastActivIndex - 1);
	  		 	document.onmousemove = document.onmouseup = null;
	  		 	slyders.lastActivIndex = slyders.lastActivIndex-1;	
  			};
  		}
  		
  	}
  	
  	document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };
  
console.log(this);
  return false;
	
}*/

function SlidesViewModel(){
	//скрывать меню
	var ul = document.getElementsByTagName('ul'),
		closeMenu = document.getElementsByClassName('closeNav');
	[].forEach.call(closeMenu, function(val){
		val.onclick = function(event){
			[].forEach.call(ul,function(ulValue){
				if (ulValue.className == 'menu') {
					ulValue.style.display = ulValue.style.display ? "": "none";
				};
			});			
		}		
	});
	// нажатие на пункт nav	
	[].forEach.call(ul,function(value){
		if (value.className == 'menu') {
			slyders.lastActivIndex = 0;
			[].forEach.call( value.children, function(childValue, index){
				childValue.onclick = function(event){
					if(index > 0){
						childValue.classList.add('activity');
						value.children[slyders.lastActivIndex+1].className = '';
						
						slyders.chenge(slyders.lastActivIndex, index-1); 
						
						slyders.lastActivIndex = index-1;
					}				
				}
			});
		}
		
	});
	// выбор слайдов
	var bar_groups = document.getElementsByClassName("bar_group");
	var barPosition = 0;
	[].forEach.call(bar_groups,function(bar_group){		
		[].forEach.call(bar_group.children,function(bar){
			bar.position = barPosition;
			bar.maxHeight = bar.getElementsByTagName('span')[0].innerText/9*100;
			slyders.bars.push(bar);
			slyders.barChenge(bar);
			barPosition += parseInt(100/bar_group.children.length);
		});		
	});
	this.DVT_val =  ko.observable('');
	this.PE_val =  ko.observable('');
	
	this.DVT_inject_Avoid = ko.computed(function(){
		if(this.DVT_val())
			return Math.round(this.DVT_val() * .925*(182*.122+2*8*(1-.122))*100)/100 ;
		return;
	},this);
	
	this.DVT_INR_clinic = ko.computed(function(){
		if(this.DVT_val())
			return Math.round(this.DVT_val() * .925*(1-.122)*(9+5)*100)/100 ;
		return;
	},this);
	this.DVT_nurce_visits = ko.computed(function(){
		if(this.DVT_val())
			return Math.round(0.064 * 2 * 8 * this.DVT_val() * .925 * (1-.122)*100)/100 ;
		return;
	},this);
	this.DVT_hospital_days = ko.computed(function(){
		if(this.DVT_val())
			return Math.round(3*52/100 * this.DVT_val() * .925 *100)/100 ;
		return;
	},this);
	this.PE_inject_Avoid = ko.computed(function(){
		if(this.PE_val())
			return Math.round(this.PE_val() * .85 * (182 * .176 + 2 * 8 *(1 - .176))*100)/100 ;
		return;
	},this);
	this.PE_INR_clinic = ko.computed(function(){
		if(this.PE_val())
			return Math.round(this.PE_val() * .85 *(1 - .176) * (9 + 5) *100)/100 ;
		return;
	},this);
	this.PE_hospital_days = ko.computed(function(){
		if(this.PE_val())
			return Math.round(this.PE_val() * .85 * 1 * .896 *100)/100 ;
		return;
	},this);
	this.sum_Combined = ko.computed(function(){
		var PE_inject_Avoid =  this.PE_inject_Avoid() || "0";
		var DVT_inject_Avoid = this.DVT_inject_Avoid() || "0";
		if(this.PE_val() || this.DVT_val()){
			return Math.round((PE_inject_Avoid + DVT_inject_Avoid)*100)/100;
		}		
	},this);
	this.sum_INR_clinic = ko.computed(function(){
		var PE_INR_clinic =  this.PE_INR_clinic() || "0";
		var DVT_INR_clinic = this.DVT_INR_clinic() || "0";
		if(this.PE_val() || this.DVT_val()){
			return Math.round((PE_INR_clinic + DVT_INR_clinic)*100)/100 ;
		}		
	},this);

	this.sum_nurceVisits = ko.computed(function(){
			
		if(this.DVT_val()){
			return (this.DVT_nurce_visits()) ;
		}		
	},this);

	this.sum_hospital_days = ko.computed(function(){
		var PE_hospital_days =  this.PE_hospital_days() || "0";
		var DVT_hospital_days = this.DVT_hospital_days() || "0";
		if(this.PE_val() || this.DVT_val()){
			return (PE_hospital_days + DVT_hospital_days) ;
		}		
	},this);
	slyders.sub = 0;

	
	this.xareltoClick = function(type){
		if (slyders.sub > -1) {
			slyders.sub -= 1;
			slyders.competitorClick(slyders.sub);
			
		};
		
	}
	this.vkatoClick = function(type){
		if (slyders.sub < 1) {
			slyders.sub += 1;	
			slyders.competitorClick(slyders.sub);
				
		};
	}
}
ko.applyBindings(new SlidesViewModel());