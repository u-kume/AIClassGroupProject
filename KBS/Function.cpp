// AUTHOR: AU
// DATE: 03/09/17
// DESC: Implements functions for ontology
// FILE: Function.cpp

#include <utility>
#include "GameType.h"
#include "GameState.h"
#include "Function.h"

void Function::move(int x_coor, int y_coor)
{
    game_state.getMapExplored().insert(std::make_pair(x_coor, y_coor));
}

void Function::rotate(double angle_arg)
{
    auto agent_data = game_state.getAgentData();
    agent_data->angle = angle_arg;
}

void Function::shoot()
{
    auto agent_data = game_state.getAgentData();
    agent_data->last_action_time = game_state.getGameTime();
}

AgentData* Function::getAgentData(std::string agent_ID)
{
    if(agent_ID.size() == 0){
        return game_state.getAgentData();
    }
    return *(game_state.getEnemy(agent_ID));
}

std::pair<int, int> Function::getAgentCoordinate()
{
    return getAgentData("")->location;
}

std::pair<int, int> Function::getEnemyCoordinate(std::string agent_ID)
{
    return getAgentData(agent_ID)->location;
}

double Function::getAgentDirectionAngle()
{
    return getAgentData("")->angle;
}

double Function::getEnemyDirectionAngle(std::string agent_ID)
{
    return getAgentData(agent_ID)->angle;
}

double Function::getAgentHP()
{
    return getAgentData("")->hp;
}

double Function::getEnemyHP(std::string agent_ID)
{
    return getAgentData(agent_ID)->hp;
}

int Function::getEnemyCount()
{
    return game_state.getAllEnemy().size();
}

void Function::updateMapExplored()
{
    game_state.getMapExplored().insert(getAgentCoordinate());
}

std::set<std::pair<int, int> > Function::getMapExplored()
{
    return game_state.getMapExplored();
}

GameState Function::getGameState()
{
    return game_state;
}

std::pair<int, int> Function::initialCoordinate()
{
    return game_state.getInitialCoordinate();
}

std::pair<int, int> Function::finalCoordinate()
{
    return game_state.getFinalCoordinate();
}
