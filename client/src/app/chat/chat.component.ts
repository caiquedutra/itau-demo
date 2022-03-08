import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Output,
  Input,
} from "@angular/core";
import { AssistantService } from "src/services/assistant.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  @Input() showChat: boolean;
  @Output() closeChat: EventEmitter<any> = new EventEmitter();

  constructor(private watsonAssistantService: AssistantService) { }

  sessionID: string = "";
  textUser: string;
  clearAll: boolean;
  arrayChat = [];
  arrayBotoes = [];
  context = {};
  messageToWatson = {};
  wait4Response: boolean = false;
  typingTimer;
  concatUserTexts = "";

  closeChatF() {
    this.context = {};
    this.clearAll = true;
    this.sessionID = "";
    if ((this.clearAll = true)) {
      this.arrayChat = [];
      this.arrayBotoes = [];
    }
    this.closeChat.emit();
  }

  ngOnInit() {
    this.ConversationFormat("");
  }
  //pega o envio do usuário
  onSubmit() {
    if (this.textUser) {
      this.arrayChat.push({
        sentBy: "user",
        text: this.textUser,
      });
      this.ConversationFormat(this.textUser);
      this.textUser = null;
      this.scrollToBottom()
    }

  }
  //pega o output do bot
  responseAssistant(text) {
    this.arrayChat.push({
      sentBy: 'bot',
      text: text
    })
    this.scrollToBottom()
  }
  //monta o input do usuário e o output do bot para o envio, adicionando o context :)
  ConversationFormat(text) {
    const messageWatson = {
      //se estou recebendo messege no backend, devo colocar message
      message: text,
      context: this.context,
    };
    this.returnAssistant(messageWatson);
    this.textUser = "";
  }

  returnAssistant(objConversation) {
    this.watsonAssistantService.assistantConversation(objConversation).subscribe(response => {
      // console.log("----- response -----")
      // console.log(response, "asdasdasdasdasd")
      this.context = response.data.context
      response.data.output.text.map((content) => {
        //atruibuição de valor no response
        if (content) {
          this.responseAssistant(content)
          this.scrollToBottom()
        }
        else {
          content = null
        }
      })
    })
  }

  scrollToBottom() {
    let element = document.getElementById("scrollMe");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

}
