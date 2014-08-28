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
	chenge : function(lastIndex, index){
<<<<<<< HEAD
		var that = this;
		if(lastIndex != index){
			that.slides[index].style.display = "block";
			that.slides[lastIndex].style.display = "none";
		
=======
		if (lastIndex != index){
			var that = this;
			that.slides[index].style.display = "block";
			that.slides[lastIndex].style.display = "none";
			
>>>>>>> gfh/master
			[].forEach.call(that.slides[index].classList,function(classlist){
				if (classlist === "slide1") {
					that.bars.forEach(function(bar){
						that.barChenge(bar);
<<<<<<< HEAD
					});			
				}
			});		
		}
		
	}	
=======
					});
				};
			});
		}	
	}
>>>>>>> gfh/master

}
window.onload = function(){
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
			var lastActivIndex = 0;
			[].forEach.call( value.children, function(childValue, index){
				childValue.onclick = function(event){
					if(index > 0){
						childValue.classList.add('activity');
						value.children[lastActivIndex+1].className = '';
						
						slyders.chenge(lastActivIndex, index-1); 
						
						lastActivIndex = index-1;
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
	
	
	
}
