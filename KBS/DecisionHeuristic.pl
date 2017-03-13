%% AUTHOR: AU
%% DATE: 03/09/17
%% DESC: Guidelines for maximizing game outcome
%% FILE: DecisionHeuristic.pl


%% Unless prohibited, the agent should continue moving
moving(X):-notAtDestination(X), stillAlive(X).

%% Unless the destination is reached, new areas should be explored
shouldMove(X, notVisited(X, Y, Z)):-notAtDestination(X).

%% Kill all enemies that appear
attack(X, Y):-enemy(Y).

% Move out of enemy line of fire
shouldMoveOutOfRange(X, Y):-inAttackRange(X, Y).
