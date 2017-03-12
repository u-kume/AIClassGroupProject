// AUTHOR: AU
// DATE: 03/09/17
// DESC: Defines functions for ontology
// FILE: Function.h

#ifndef KB_FUNCTION_H
#define KB_FUNCTION_H

#include <set>
#include "GameType.h"
#include "GameState.h"

class Function{

    public:

        Function(GameState game_state_arg) : game_state(game_state_arg) { }

        // Functions that game Agent can perform //
        /**
         * The KB will not actually cause the agent to perform the action,
         * but will update any cached values and return the action to the Agent class
         * which will implemented by John Baggs
         **/

        // Move to point specified by arguments
        void move(int x_coor, int y_coor);

        // Rotate agent line of sight to alpha angle from 0 - 360 degrees
        void rotate(double angle_arg);

        // Fire single round on line of sight
        void shoot();

        // General utility functions from ontology //

        // Retrieve AgentData for any tracked agent or enemy
        AgentData* getAgentData(std::string agent_ID);

        // Get agent location from AgentData
        std::pair<int, int> getAgentCoordinate();

        // Get enemy location from AgentData
        std::pair<int, int> getEnemyCoordinate(std::string agent_ID);

        // Get angle agent is facing and will fire on
        double getAgentDirectionAngle();

        // Get angle enemy is facing and will attack on
        double getEnemyDirectionAngle(std::string agent_ID);

        // Get agent health points
        double getAgentHP();

        // Get enemy health points
        double getEnemyHP(std::string agent_ID);

        // Get count of tracked enemies
        int getEnemyCount();

        // Add point of coordinate visited beyond circumferencewith range == x, of last point moved to
        void updateMapExplored();

        // Get set of all points visited by agent
        std::set<std::pair<int, int> > getMapExplored();

        // Get default agent location for game start
        std::pair<int, int> initialCoordinate();

        // Get final agent location for game end with agent living
        std::pair<int, int> finalCoordinate();

        // Get game_state object
        GameState getGameState();

    private:
        GameState game_state;
};

#endif
