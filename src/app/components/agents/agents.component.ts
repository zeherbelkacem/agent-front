import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/model/agent';
import { AgentService } from 'src/app/service/agent.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
})
export class AgentsComponent implements OnInit {
  totalAgents: number = 0;
  activeAgents: number = 0;
  disconnectedAgents: number = 0;
  pendingAgents: number = 0;
  neverConnectedAgents: number = 0;
  localAgentName = 'cyr-customer-ossec.local';

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agentService.getAllAgents().subscribe((agents) => {
      this.getAgents(agents);
    });
  }

  getAgents(agents: Agent[]) {
    this.totalAgents = agents.length - 1;
    for (let i = 0; i < agents.length; i++) {
      if (agents[i].name !== this.localAgentName) {
        switch (agents[i].status) {
          case 'active': {
            this.activeAgents++;
            break;
          }
          case 'disconnected': {
            this.disconnectedAgents++;
            break;
          }
          case 'pending': {
            this.pendingAgents++;
            break;
          }
          case 'never_connected': {
            this.neverConnectedAgents++;
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }
}
