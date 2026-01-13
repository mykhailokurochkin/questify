import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(data: { title: string; questions: any[] }) {
    return this.prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : null,
          })),
        },
      },
    });
  }

  async getAllQuizzes() {
    return this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getQuizById(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (quiz) {
      quiz.questions = quiz.questions.map((q) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
      }));
    }

    return quiz;
  }

  async updateQuiz(id: string, data: { title: string; questions: any[] }) {
    return this.prisma.$transaction(async (tx) => {
      await tx.question.deleteMany({ where: { quizId: id } });

      return tx.quiz.update({
        where: { id },
        data: {
          title: data.title,
          questions: {
            create: data.questions.map((q) => ({
              text: q.text,
              type: q.type,
              options: q.options ? JSON.stringify(q.options) : null,
            })),
          },
        },
      });
    });
  }

  async deleteQuiz(id: string) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
