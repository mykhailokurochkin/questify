import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';

@Module({
  imports: [],
  controllers: [QuizController],
  providers: [PrismaService, QuizService],
})
export class AppModule {}
