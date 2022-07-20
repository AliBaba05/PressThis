class Game{
	#dom_key = $("#dom-key");
	#dom_score = $("#dom-score");
	#dom_timer = $('#dom-timer');
	#letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
	#numbers = "1234567890";
	#control = "";

	#timer;
	#time_left = 60;
	#timer_executed = false;

	#key = '';
	#score = 0;
	#is_game_over = false;
	#game_mode = false;

	constructor(){
		this.#reset_all();
		this.change_game_mode();
	}

	#reset_all(){
		this.#timer;
		this.#time_left = 60;
		this.#timer_executed = false;

		this.#key = '';
		this.#score = 0;
		this.#is_game_over = false;
		this.#refresh_stats();
	}

	#increase_score(){
		this.#score += 1;
	}

	#decrease_score(){
		this.#score -= 1;
	}

	#change_key_value(){
		this.#key = this.#control[Math.floor(Math.random() * this.#control.length)]
		this.#dom_key.text(this.#key);
	}

	#refresh_stats(){
		this.#change_key_value(); 
		this.#dom_score.text(`Score: ${this.#score}`);	
	}

	#wrong_key_effect(){
		$(".key").toggleClass("key-shadow wrong");
		setTimeout(()=>{
			$(".key").toggleClass("key-shadow wrong");
		},150);
	}

	#is_key_includes(e){
		return this.#control.includes(e.key.toUpperCase());
	}

	#is_key_right(e){
		return e.key.toUpperCase() == this.#key;
	}

	start_game(){
		if(!this.#timer_executed){
			this.#start_timer();
			this.#timer_executed = true;
		}
	}

	handle_key(e){
		if(!this.#is_game_over){
			
			if (this.#is_key_includes(e)){
				
				if (this.#is_key_right(e)){
					this.#increase_score();
					this.#refresh_stats();
				}else{
					this.#wrong_key_effect();
					this.#decrease_score();
					this.#refresh_stats();
				}

			}
		}
	}

	play_again(){
		if(this.#is_game_over){

		this.#reset_all();

		$('#timer').html(this.#time_left);
		this.#refresh_stats();
		this.#hide_modal();
		}
	}

	#set_score_value(){
		$("#score-val").attr("value",this.#score);
	}

	// Timer

	#start_timer(){
		this.#timer = setInterval(()=>{this.#update_timer();}, 1000);
	 	this.#update_timer();
	}

	#stop_timer(){
		clearInterval(this.#timer);
	}

	#game_over(){
		this.#set_score_value();
		this.#show_modal();
		this.#is_game_over = true;
		this.#stop_timer();
	}

	#update_timer(){
		this.#time_left -= 1;

		if(this.#time_left >= 0){
			this.#dom_timer.html(this.#time_left);
		}
		else {
			this.#game_over();
		}

	}

	// Modal

	#set_modal_content(){
		$("#your-score").text(`Your score is ${this.#score}`);
	}
	#show_modal(){
		this.#set_modal_content();
		$("#go-modal").toggleClass('modal-close modal-open');
	}
	#hide_modal(){
		$("#go-modal").toggleClass('modal-close modal-open');	
	}


	//Game mode

	#set_game_mode(){
		this.#game_mode = $("#mode-switch").prop("checked");
	}

	change_game_mode(){
		this.#stop_timer();
		this.#set_game_mode();

		if(this.#game_mode){
			this.#control = this.#numbers;
		}else{
			this.#control = this.#letters;			
		}
		this.#reset_all();
		this.#dom_timer.html(this.#time_left);
	}


}



// init game
const game = new Game();


// keydown event listener
$(document).keydown((e)=>{
	game.start_game();
	game.handle_key(e);		
});

$("#play-again").click(()=>{
	game.play_again();	
});


$("#mode-switch").change(()=>{
	game.change_game_mode();
});