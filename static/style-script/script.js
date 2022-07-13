const dom_key = $("#dom-key");
const dom_score = $("#dom-score");
const alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM";
const dom_timer = $('#dom-timer');

class Game{
	constructor(){
		this.timer;
		this.time_left = 60;
		this.score = 0;
		this.key = "";
		this.is_game_over = false;
		this.timer_executed = false;
	}

	increase_score(){
		this.score += 1;
	}

	decrease_score(){
		this.score -= 1;
	}

	change_key_value(){
		this.key = alphabet[Math.floor(Math.random() * alphabet.length)]
		dom_key.text(this.key);
	}

	refresh_stats(){
		this.change_key_value(); 
		dom_score.text(`Score: ${this.score}`);
	}

	wrong_key_effect(){
		$(".key").toggleClass("key-shadow wrong");
		setTimeout(()=>{
			$(".key").toggleClass("key-shadow wrong");
		},150);
	}

	// is the key in alpabet
	is_key_includes(e){
		return alphabet.includes(e.key.toUpperCase());
	}

	is_key_right(e){
		return e.key.toUpperCase() == this.key;
	}
	
	handle_key(e){
		var key_inc = this.is_key_includes(e);
		
		if (key_inc){
			var key_right = this.is_key_right(e);
			
			if (key_right){
				this.increase_score();
				this.refresh_stats();
			}else{
				this.wrong_key_effect();
				this.decrease_score();
				this.refresh_stats();
			}

		}
	}

	play_again(){
		this.timer;
		this.time_left = 60;
		this.score = 0;
		this.key = "";
		this.is_game_over = false;
		this.timer_executed = false;
		$('#timer').html(this.time_left);
		this.refresh_stats();
		this.hide_modal();
	}

	set_score_value(){
		$("#save-score").attr("value",this.score);
	}

	// Timer

	start_timer(){
		this.timer = setInterval(()=>{this.update_timer();}, 1000);
	 	this.update_timer();

	}

	stop_timer(){
		clearInterval(this.timer);
	}

	game_over(){
		this.set_score_value();
		this.show_modal();
		this.is_game_over = true;
		this.stop_timer();
	}

	update_timer(){
		this.time_left = this.time_left - 1;

		if(this.time_left >= 0){
			dom_timer.html(this.time_left);
		}
		else {
			this.game_over();
		}

	}

	// Modal

	set_modal_content(){
		$("#your-score").text(`Your score is ${this.score}`);
	}
	show_modal(){
		this.set_modal_content();
		$("#go-modal").toggleClass('modal-close modal-open');
	}
	hide_modal(){
		$("#go-modal").toggleClass('modal-close modal-open');	
	}

}


// init game
const game = new Game();


$(()=>{
	game.refresh_stats();
});

// keydown event listener
$(document).keydown((e)=>{
	if (!game.timer_executed){
		game.timer_executed = true;
		game.start_timer();
	}

	if (!game.is_game_over) {
		game.handle_key(e);	
	}	

});

$("#play-again").click(()=>{
	if (game.is_game_over){
		game.play_again();	
	}
});
