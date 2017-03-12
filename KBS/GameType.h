// AUTHOR: AU
// DATE: 03/09/17
// DESC: Define gametypes
// FILE: GameType.h

#ifndef KB_GAMETYPE_H
#define KB_GAMETYPE_H

#include <utility>
#include <string>

struct AgentData{

    AgentData(std::string agent_ID_arg, std::string last_action_time_arg)
    {
        agent_ID = agent_ID_arg;
        last_action_time = last_action_time_arg;
    }

    std::string agent_ID;
    std::pair<int, int> location;
    std::string last_action_time;
    double angle;
    double hp;
    std::string attack_type;
    double attack_range;
};

enum class AttackType{
    BEAM = 0,
    AREA,
    TOUCH,
};

#endif
