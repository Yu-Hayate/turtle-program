enum Listvalue {
    x = 0,
    y = 1,
    color = 2,
    angle = 3,
    StepsTaken = 4
}
enum Direction {
    forword = 1,
    backwords = -1
}
function Draw() {
    for (let Turtle of TurtleGide) {
        scene.backgroundImage().setPixel(Turtle[Listvalue.x], Turtle[Listvalue.y], Turtle[Listvalue.color])
    }
}
function transformAngle(angle: number): number {
    if (angle < 0) {
        angle = 360 + angle;
    }
    return angle;
}
let tempAngle = 0
let TurtleGide: number[][] = []
let TurtleNameList: string[] = []
let Index = 0
namespace turtle {
    //% block="set the angle of turtle with name$Name to $Angle degrees"
    //% Name.shadow="TurtleNamesList"
    export function SetAngleOfTurtle(Name: string, Angle: number) {
        Index = TurtleNameList.indexOf(Name)
        if (Index != -1) {
            TurtleGide[Index][Listvalue.angle] = 0 - Angle
        }
    }
    //% block="move turtle with name $Name $Steps steps $Towords"
    //% Name.shadow="TurtleNamesList"
    export function MoveTurtle(Name: string, Steps: number, Towords: Direction) {
        Index = TurtleNameList.indexOf(Name)
        if (Index != -1) {
            tempAngle = TurtleGide[Index][Listvalue.angle] * (Math.PI / 180)
            for (let index = 0; index < Math.ceil(Steps); index++) {
                TurtleGide[Index][Listvalue.x] = TurtleGide[Index][Listvalue.x] + Towords * Math.cos(tempAngle)
                TurtleGide[Index][Listvalue.y] = TurtleGide[Index][Listvalue.y] + Towords * Math.sin(tempAngle)
                pause(1)
                Draw()
            }
            TurtleGide[Index][Listvalue.StepsTaken] = TurtleGide[Index][Listvalue.StepsTaken] + Steps
        }
    }
    //% block="Change the angle of turtle with name $Name by $Angle degrees"
    //% Name.shadow="TurtleNamesList"
    export function ChangeAngleOfTurtle(Name: string, Angle: number) {
        Index = TurtleNameList.indexOf(Name)
        if (Index != -1) {
            TurtleGide[Index][Listvalue.angle] = TurtleGide[Index][Listvalue.angle] + Angle
        }
    }
    //% block="set color of turtle with name $Name to $Color=colorindexpicker"
    //% Name.shadow="TurtleNamesList"
    export function SetColorOfTurtle(Name: string, Color: number) {
        Index = TurtleNameList.indexOf(Name)
        if (Index != -1) {
            TurtleGide[Index][Listvalue.color] = Color
        }
    }
    //% block="Create Turtle with name $Name Place Turtle at | x $X y $Y | set color of turtle to $C=colorindexpicker"
    //% Name.shadow="TurtleNamesList"
    export function CreateTurtle(Name: string, X: number, Y: number, C: number) {
        // Angle is not is not in radians
        TurtleGide.push([
            X,
            Y,
            C,
            0,
            0
        ])
        TurtleNameList.push(Name)
        Draw()
    }
    //% block="get $Item of $Name"
    //% Name.shadow="TurtleNamesList"
    export function TurtleListItem(Item: Listvalue, Name: string) {
        Index = TurtleNameList.indexOf(Name)
        if (Index != -1) {
            if (Item != 3) {
                return TurtleGide[Index][Item]
            } else {
                return transformAngle(TurtleGide[Index][Item] % 360)
            }
        } else {
            return null
        }
    }
    //% block="$name"
    //% blockId=TurtleNamesList
    //% blockHidden=true shim=TD_ID
    //% name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //% name.fieldOptions.key="TurtleNameList"
    export function TurtleNameShadow(name: string) {
        return name
    }
}