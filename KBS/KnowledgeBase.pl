%% AUTHOR: AU
% DATE: 03/09/17
% DESC: Collection of sentences in the knowledge base
% FILE: KnowledgeBase.pl

%% Agent and enemies are both agent objects

%% When a agent or enemy enters the game its health is at maximum value
maxHealth(X):-newAgent(X).

%% Being attacked damages an agent's health
damageAgent(X):-attack(Y, X).

%% Agents that attack eachother are enemies
enemy(X, Y):-attack(Y, X), attack(X,Y).

%% An agent that is not the game agent is an enemy
enemy(Y, X):-agent(Y), agent(X).

%% Agents will follow their enemies
follows(X, Y):-enemy(X, Y).

% New doors will be closed
closed(D):-door(D), newDoor(D).

