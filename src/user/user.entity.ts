import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.enum';
import { ActivityLog } from 'src/admin/activity-log.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
  token: any;

  @Column({ nullable: true })
  verificationToken?: string;

  @Column()
  role: UserRole;

  @OneToMany((_type) => ActivityLog, (activityLog) => activityLog.user, {
    eager: true,
  })
  activityLogs: ActivityLog[];
}
