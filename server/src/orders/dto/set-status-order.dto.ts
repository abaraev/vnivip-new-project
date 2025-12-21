import {IsNotEmpty, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";
import {IsOrderStatus} from "../../decorators/IsOrderStatus";

export class SetStatusOrderDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly orderId: number;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsOrderStatus({message: 'required order status. PENDING, CANCELLED, COMPLETED'})
    readonly status: string;
}
