class Chrono 
{
    constructor()
    {
        this.heure = 16;
        this.minute = 0;
        this.pause = true;
    }
    
    count() 
    {
        if(!this.pause)
        {
            this.minute = this.minute + 1;
        
            if(this.minute == 60) {
                this.heure = this.heure + 1;
                this.minute = 0;
            }
        }  
        return(this.heure * 60 + this.minute);
    }

    mettrePause() 
    {
        this.pause = true;
    }
    
    continuer() 
    {
        this.pause = false;
    } 
    
    restart() {
        this.heure = 16;
        this.minute = 0;
    }
}