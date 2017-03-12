// AUTHOR: AU
// DATE: 03/09/17
// DESC: Holds all predicates implementations for KBS
// FILE: Predicate.cpp


#include <ctime>
#include "GameType.h"
#include "Function.h"
#include "Predicate.h"

bool Predicate::isGoalAchieved()
{
    auto range = funct.getGameState().getRange();
    auto current_pnt = funct.getAgentCoordinate();
    auto final_pnt = funct.getFinalCoordinate();

    return abs(final_pnt - current_pnt) < range;
}

bool Predicate::isAlive()
{
    return funct.getAgentHP() > 0;
}

bool Predicate::isMoving(int x_coor, int y_coor)
{
    auto current_pnt = funct.getAgentCoordinate();
    auto next_pnt = std::make_pair(x_coor, y_coor);
    auto range = funct.getGameState().getRange();

    return abs(next_pnt - current_pnt) > range;
}

bool Predicate::isTargetAlive(std::string enemy_ID)
{
    return funct.getEnemyHP(enemy_ID) > 0;
}

bool Predicate::isAreaSafe(double range)
{
    return !isEnemyPresent(range);
}

bool Predicate::isEnemyPresent(double range)
{
    return funct.getEnemyCount() == 0;
}
