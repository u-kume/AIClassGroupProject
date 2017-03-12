// AUTHOR: AU
// DATE: 03/09/17
// DESC: Implementation of knowledge base vocabulary
// FILE: Ontology.h

#ifndef KB_ONTOLOGY
#define KB_ONTOLOGY

#include "GameType.h"
#include "GameState.h"
#include "Function.h"
#include "Predicate.h"

struct Ontology{

    Ontology(std::pair<int, int> final_position)
    {
        kb_game_state = new GameState(final_position);
        kb_agent_data = new AgentData("agent007", kb_game_state->getGameTime());
        kb_funct = new Function(*kb_game_state);
        kb_predicate = new Predicate(*kb_funct);
    }

    // create instance of each object building block of ontology
    GameState *kb_game_state;
    AgentData *kb_agent_data;
    AttackType kb_attack_type;
    Function *kb_funct;
    Predicate *kb_predicate;
};
#endif
