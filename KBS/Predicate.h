// AUTHOR: AU
// DATE: 03/09/17
// DESC: Holds all predicate definitions for KBS
// FILE: Predicate.h

#ifndef PREDICATE_H
#define PREDICATE_H

#include <ctime>
#include "GameType.h"
#include "Function.h"

class Predicate{

    public:

        // construct Predicate and initialize members
        Predicate(Function funct_arg) : funct(funct_arg){}

        // Returns true when agent has reached the destinationbool
        bool isGoalAchieved(double x_coor, double y_coor);


        bool isAlive(); // returns true if the agent is alive

        // returns true if the last coordinates given to the move function differ from current location
        bool isMoving(int x_coor, int y_coor);

        // returns true if current enemy target is alive, false otherwise
        bool isTargetAlive(std::string enemy_ID);

        // returns true if no enemies or elements to reduce agent HP are in the area
        bool isAreaSafe(double range = 100);

        // return true if enemy is with in circle with radius == range
        bool isEnemyPresent(double range);

    private:
        Function funct;
        //bool is_alive = true;
        //std::pair<int, int> last_move;
        //char *last_action_time;
};
#endif
