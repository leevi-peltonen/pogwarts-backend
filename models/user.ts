import { IAttributes } from './attributes';
import { IWeapon } from './weapon';

export interface IUser {
    id: string;
    username: string;
    level: number;
    attributes: IAttributes;
    health: number;
    damage: number;
    experience: number;
    availableAttributePoints: number;
    equippedWeapon: IWeapon;
    weapons: IWeapon[];
    //armor: IArmor[];
    coins: number;
    highestLevelOfKilledMonsters: number;
};