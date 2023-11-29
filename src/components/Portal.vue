<script lang="ts">
import router from '@/router'
import { RouterLink, RouterView } from "vue-router";

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
        showTerm: true
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
            if(this.command.substring(0,this.command.indexOf(' ')) == 'clear' || this.command == 'clear')
            {
                this.history = this.history.clear();
                this.command = ''
                return
            }
            
            if(this.command.substring(0,this.command.indexOf(' ')) == 'exit' || this.command == 'exit')
            {
                this.history = this.history.clear();
                this.command = ''
                this.showTerm = false
                return
            }

            this.history = this.history.addChild(this.command,onSubmitEvent(this.command))
            this.command = "";
        }
    }
}

function listWrap(input:String):string {
    return "<li class=\"item\"><pre>" + input + "</pre></li>"
}

function onSubmitEvent(input:String):string {
    let out = 'functionality in progress'
    let commands = input.split(' ')

    switch (commands[0]) {
        case "help":
            out = listWrap("Available commands:");
            out +=listWrap("about\t\tshow my info");
            out +=listWrap("contact\t\tshow my contact information");
            out +=listWrap("help\t\tshow this menu");
            out +=listWrap("nav\t\tnavigate to specified page.Only navigates to links on this page.");
            break;
        case "about":
            out = ''
            break;
        case "nav":
            if (commands.length < 2) {
                out = listWrap("Usage: nav target_name")
                out += listWrap("Options:")
                out += listWrap("\ttarget_name\t\tNavigate to target")
                out += listWrap("Available Targets:")
                out += listWrap("\tabout, home, contact")

                break;
            }
            switch (commands[1]){
                case "home":
                    router.push('/')
                    break;
                case "about":
                    router.push('/about')
                    break;
                case "contact":
                    router.push('/contact')
                    break;
                default:
                    out = listWrap("parameter " + commands[1] + " not recognized.")
                    return out;
                    break;
            }
            out = ''
            break
        case "":
            out = ''
            break;
        case "exit":
            // add later: hide console
            break;
        case "contact":
            out = listWrap("Nicholas Crockett")
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
    return out
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
    <div class="console" v-if="showTerm">
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
    font-family: 'Courier New', Courier, monospace;
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
    font-family: inherit;
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
    font-family: inherit;
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
    font-family: inherit;
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
    font-family: inherit;
}
</style>