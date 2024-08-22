import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity'; // Assuming you have a User entity

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.activityLogs)
  user: User;

  @Column()
  action: string;

  @Column()
  timestamp: Date;

  @Column()
  ipAddress: string;
}
