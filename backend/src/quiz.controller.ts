import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() createQuizDto: { title: string; questions: any[] }) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  findAll() {
    return this.quizService.getAllQuizzes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: { title: string; questions: any[] },
  ) {
    return this.quizService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.deleteQuiz(id);
  }
}
