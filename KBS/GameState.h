// AUTHOR: AU
// DATE: 03/09/17
// DESC: Cache frequently used information about game environment
// FILE: GameState.h

#ifndef KB_GAME_STATE_H
#define KB_GAME_STATE_H

#include <set>
#include <utility>
#include <ctime>
#include <sstream>
#include "GameType.h"

class GameState{

    public:

        GameState(std::pair<int, int> final_position) : final_coordinate(final_position)
        {
            // Setup agent

            time_t raw_time = time(NULL);
            agent = new AgentData("Agent", ctime(&raw_time));

            // Initial state variables
            last_game_change_time = ctime(&raw_time);
            std::string last_assigned_id = "";
            long last_assigned_id_num = 0;
            initial_coordinate.first = initial_coordinate.second = 0;
            final_coordinate.first = final_coordinate.second = 0;
        }

        // Get all living enemies in game
        std::set<AgentData*> getAllEnemy()
        {
            return all_enemy;
        }

        // Add an enemy to tracked enemies set
        void addEnemy()
        {
            std::stringstream enemy_id("enemy");
            enemy_id << last_assigned_id_num;
            last_assigned_id = enemy_id.str();
            time_t raw_time = time(NULL);

            AgentData *new_enemy = new AgentData(last_assigned_id, ctime(&raw_time));
            all_enemy.insert(new_enemy);
        }

        // Get an enemy from tracked enemies set
        std::set<AgentData*>::iterator getEnemy(std::string enemy_ID)
        {
            std::set<AgentData*> enemies = getAllEnemy();

            std::set<AgentData*>::iterator enemy_it = enemies.begin();
            if((*enemy_it)->agent_ID != enemy_ID){
                while(++enemy_it != enemies.end()){
                    if((*enemy_it)->agent_ID == enemy_ID){
                        break;
                    }
                }
            }
            return enemy_it;
        }

        // Remove an enemy from tracked enemies set
        void removeEnemy(std::string enemy_ID)
        {
            auto enemy_it = getEnemy(enemy_ID);
            all_enemy.erase(enemy_it);
        }

        std::string getGameTime()
        {
            time_t raw_time = time(NULL);
            return std::string(ctime(&raw_time));
        }

        std::set<std::pair<int, int> > getMapExplored()
        {
            return mapExplored;
        }

        AgentData* getAgentData()
        {
            return agent;
        }

        std::pair<int, int> getInitialCoordinate()
        {
            return initial_coordinate;
        }

        std::pair<int, int> getFinalCoordinate()
        {
            return final_coordinate;
        }

        long getRange()
        {
            return range;
        }

        void setRange(long range_arg)
        {
            range = range_arg;
        }

        // FUTURE:
        // Check new enemy ID is unique

    private:
        std::set<AgentData*> all_enemy; // all tracked enemies
        std::string last_active_enemy; // last enemy to take action
        std::string last_game_change_time; // system time of las change in game state
        std::string last_assigned_id; // number formatted as string
        long last_assigned_id_num; // number appended to ID of last tracked enemy
        AgentData *agent; // keep track of agent

        /** range - radius of circle around Agent in pixels
        * used to reduce the number of coordinates that must be tracked,
        * any movement within the circumference of a recorded coordinate
        * isn't considered new movement
        **/
        double range = 100;

        std::set<std::pair<int, int> > mapExplored; // holds all coordinates visited by the agent

        std::pair<int, int> initial_coordinate; // starting position of agent

        std::pair<int, int> final_coordinate; // ending position of agent
};
#endif
