<script lang="ts">
import router from '@/router'
import { Terminal } from 'xterm'

export default{
    props: Object.assign({
        buffer: String,
        background: String,
        foreground: String,
        title: String
    }),
    data: () => ({
        history: new commandListItem("Welcome! Type in 'help' to begin.","",0),
        command: "",
        term: new Terminal()
    }),
    computed: {
        output() {
            const out = this.history.printList()
            // console.log(out)

            this.history.prune(100,this.history.lineNum)

            return out
        }
    },
    initialize() {
        this.term
    },
    methods: {
        update (e: Event) {
            this.command = e.target.value;
            // this.command = ""
        },
        submit (e: Event) {
            let out = 'functionality in progress'
            switch (this.command) {
                case "help":
                    out = listWrap("------------------------------------");
                    out +=listWrap("about\t\tshow my info");
                    out +=listWrap("contacts\tshow my contact information");
                    out +=listWrap("help\t\tshow this menu");
                    out += listWrap("------------------------------------");
                    break;
                case "clear":
                    this.history = this.history.clear();
                    this.command = ''
                    out = ''
                    // return;
                    break;
                case "about":
                    out = ''
                    break;
                case "":
                    out = ''
                    break;
                case "exit":
                    // add later: hide console
                    break;
                case "contacts":
                    out = listWrap("------------------------------------");
                    out += listWrap("Nicholas Crockett")
                    out +=listWrap("phone:\t\t417.268.8817")
                    out +=listWrap("email:\t\tnicholasccrockett@gmail.com")
                    out +=listWrap("linkedin:\tlinkedin.com/in/nick-crockett")
                    out +=listWrap("\t")
                    out +=listWrap("1421 N University Ave")
                    out +=listWrap("Apt. N332")
                    out +=listWrap("Little Rock, AR, 72207")
                    out += listWrap("------------------------------------");
                    break;
                default:
                    out = 'Command not recognized. Type "help" to list available commands.'
                    break;
            }


            this.history = this.history.addChild(this.command,out)
            this.command = "";
        }
    }
}
function listWrap(input:String):string {
    return "<li class=\"item\"><pre>" + input + "</pre></li>"
}

class commandListItem {
    command: String;
    output: String;
    lineNum: number;
    parent: commandListItem;

    constructor (command:String,output:String,lineNum:number,parent?:commandListItem) {
        this.command = command;
        this.output = output;
        this.lineNum = lineNum;

        if(typeof parent !== 'undefined'){
            this.parent = parent;
        }else {
            this.parent = this;
        }
    }
    addChild(cmd:String, out:String) {return new commandListItem(cmd,out,(this.lineNum+1),this)}
    print(): String {
        if(this.lineNum == this.parent.lineNum){
            return this.command;
        } else {
            return this.parent.print() + "\n" + this.command;
        }
    }

    printList():String {
        let rstr:string;
        if (this.command.length>0){
            rstr = listWrap("> " + this.command) + this.output;
        }else {
            rstr = listWrap(this.command) + this.output;
        }

        if(this.lineNum == this.parent.lineNum){
            return rstr;
        } else {
            return this.parent.printList() + rstr;
        }
    }

    clear():commandListItem {
        if (this.lineNum == this.parent.lineNum){
            return new commandListItem("","",0)
        } else {
            return this.parent.clear()
        }
    }
    self():commandListItem {
        return this
    }

    prune(n:number,curLine:number) {
        // console.log(this.command);
        if (this.lineNum !== this.parent.lineNum){
            if(curLine-this.lineNum > n){
                this.parent = this.self()
            } else{
                this.parent.prune(n,curLine)
            }
        }    
    }
}

</script>

<template>
    <div class="console" >
        <div class="terminal">
            <div class="terminal-commandline-history"><ul class="history" id="history-list" v-html="output"></ul></div>
            <div class="terminal-commandline"><pre>> <input class="input" type="text" :value="command" @input="update" @keypress.enter="submit"/></pre></div>
        </div>
    </div>
</template>

<style scoped>

.console {
    padding: 2px;
    min-width: 45vw;
    min-height: 30vh;
    max-width: 90vw;
    border: #111 solid;
    background-color: #111;
    border-radius: 3px;
    max-height: 50vh;
    scroll-behavior: auto;
    overflow-x: hidden;
    overflow-y:auto;
}

.terminal {
    display: flex;
    align-items: left;
    flex-direction: column;
    padding-left: 10px;
    width: 100%; 
    height: 100%;
    background: none;
    border: none;
    color: #AAA;
}

.terminal-commandline-history ul{
    list-style: none;
    margin: 0;
    padding: 0;
}

.terminal-commandline-history ul li{
    white-space: normal;
}

.terminal-commandline-history ul li pre{
    font-size: 1rem;
    font-weight: 100;
    align-content: top;
}

.terminal-commandline pre {
    width: 100%;
    font-size: 1rem;
    font-weight: 100;
}

.terminal-commandline {
    display: flex;
    justify-items: center;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    height: 100%;
    font-size: 1rem;
    font-weight: 100;
}

.terminal-commandline .input {
    width: 100%;
    background: none;
    border: none;
    color: #AAA;
    outline:none;
    font-size: 1rem;
    font-weight: 100;
    padding: 0;
}

h1 {
    font-weight: 100;
    font-size: 1rem;
    padding-left: 5px;

    background-color: black;
}

.portal {
    font-size: 1rem;
    background-color: #222;
    
    padding-left: 5px;
    color: #AAA;

    width: 100%;
    height: 100px;
}
</style>