import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const grammarTopics = [
  {
    id: 'tenses',
    title: 'Времена глаголов',
    icon: 'Clock',
    completed: false,
    rules: [
      {
        name: 'Present Simple',
        description: 'Простое настоящее время для регулярных действий и фактов',
        examples: ['I study English every day', 'The sun rises in the east', 'She works at a hospital'],
        formula: 'Subject + V1 (he/she/it + V1+s)'
      },
      {
        name: 'Past Simple',
        description: 'Простое прошедшее время для завершённых действий в прошлом',
        examples: ['I visited London last year', 'He studied yesterday', 'They played football'],
        formula: 'Subject + V2 (правильные: V+ed, неправильные: 2-я форма)'
      },
      {
        name: 'Future Simple',
        description: 'Простое будущее время для действий в будущем',
        examples: ['I will go to school tomorrow', 'She will help you', 'We will study harder'],
        formula: 'Subject + will + V1'
      }
    ]
  },
  {
    id: 'articles',
    title: 'Артикли',
    icon: 'FileText',
    completed: false,
    rules: [
      {
        name: 'Неопределённый артикль a/an',
        description: 'Используется с исчисляемыми существительными в единственном числе',
        examples: ['a book', 'an apple', 'a university', 'an hour'],
        formula: 'a + согласная, an + гласная (по звуку!)'
      },
      {
        name: 'Определённый артикль the',
        description: 'Конкретный предмет, единственный в своём роде, повторное упоминание',
        examples: ['the Sun', 'the book I bought', 'the best student', 'the United Kingdom'],
        formula: 'the + любое существительное (когда понятно, о чём речь)'
      },
      {
        name: 'Нулевой артикль',
        description: 'Отсутствие артикля с неисчисляемыми и множественным числом в общем смысле',
        examples: ['I like music', 'Books are important', 'Water is essential', 'They speak English'],
        formula: '∅ + множественное число / неисчисляемое (в общем смысле)'
      }
    ]
  },
  {
    id: 'modals',
    title: 'Модальные глаголы',
    icon: 'Lightbulb',
    completed: false,
    rules: [
      {
        name: 'Can / Could',
        description: 'Возможность, способность, разрешение, вежливая просьба',
        examples: ['I can swim', 'Could you help me?', 'She can speak three languages'],
        formula: 'can/could + V1 (без to)'
      },
      {
        name: 'Must / Have to',
        description: 'Обязанность, необходимость (must — личное мнение, have to — внешние правила)',
        examples: ['You must study', 'I have to wake up early', 'Students must wear uniforms'],
        formula: 'must + V1 / have/has to + V1'
      },
      {
        name: 'Should / Ought to',
        description: 'Совет, рекомендация',
        examples: ['You should read more', 'We ought to be polite', 'He should exercise regularly'],
        formula: 'should + V1 / ought to + V1'
      }
    ]
  },
  {
    id: 'conditionals',
    title: 'Условные предложения',
    icon: 'GitBranch',
    completed: false,
    rules: [
      {
        name: 'Zero Conditional',
        description: 'Общие истины, научные факты',
        examples: ['If you heat water to 100°C, it boils', 'If it rains, the ground gets wet'],
        formula: 'If + Present Simple, Present Simple'
      },
      {
        name: 'First Conditional',
        description: 'Реальное условие в будущем',
        examples: ['If I study hard, I will pass the exam', 'If it rains tomorrow, we will stay home'],
        formula: 'If + Present Simple, will + V1'
      },
      {
        name: 'Second Conditional',
        description: 'Нереальное / маловероятное условие в настоящем/будущем',
        examples: ['If I were rich, I would travel the world', 'If I had time, I would help you'],
        formula: 'If + Past Simple, would + V1'
      }
    ]
  }
];

const quizQuestions = [
  {
    question: 'Choose the correct form: "She ___ to school every day"',
    options: ['go', 'goes', 'going', 'gone'],
    correct: 1,
    topic: 'tenses'
  },
  {
    question: 'Choose the correct article: "___ apple a day keeps the doctor away"',
    options: ['a', 'an', 'the', '-'],
    correct: 1,
    topic: 'articles'
  },
  {
    question: 'Choose the correct modal: "You ___ wear a uniform at school" (it\'s a rule)',
    options: ['can', 'must', 'may', 'could'],
    correct: 1,
    topic: 'modals'
  },
  {
    question: 'Choose the correct form: "If I ___ you, I would study harder"',
    options: ['am', 'was', 'were', 'be'],
    correct: 2,
    topic: 'conditionals'
  }
];

const Index = () => {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const progress = (completedTopics.length / grammarTopics.length) * 100;

  const toggleTopicComplete = (topicId: string) => {
    setCompletedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Icon name="BookOpen" size={32} className="text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">English Grammar</h1>
              <p className="text-sm text-muted-foreground">Образовательный проект для 9 класса</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} />
              Прогресс изучения
            </CardTitle>
            <CardDescription>
              Завершено тем: {completedTopics.length} из {grammarTopics.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="topics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="topics" className="flex items-center gap-2">
              <Icon name="Library" size={18} />
              Темы
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Icon name="Brain" size={18} />
              Тест
            </TabsTrigger>
          </TabsList>

          <TabsContent value="topics">
            <div className="grid gap-6 md:grid-cols-2">
              {grammarTopics.map((topic) => (
                <Card key={topic.id} className="relative overflow-hidden transition-all hover:shadow-lg">
                  {completedTopics.includes(topic.id) && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500">
                        <Icon name="Check" size={14} />
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon name={topic.icon} size={24} className="text-primary" />
                      </div>
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {topic.rules.map((rule, idx) => (
                        <AccordionItem key={idx} value={`rule-${idx}`}>
                          <AccordionTrigger className="text-left">
                            <span className="font-semibold">{rule.name}</span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">{rule.description}</p>
                            
                            <div className="bg-secondary/50 p-3 rounded-md">
                              <p className="text-xs font-semibold text-primary mb-1">Формула:</p>
                              <code className="text-sm">{rule.formula}</code>
                            </div>
                            
                            <div>
                              <p className="text-xs font-semibold text-primary mb-2">Примеры:</p>
                              <ul className="space-y-1">
                                {rule.examples.map((example, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2">
                                    <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                    <span>{example}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <Button 
                      onClick={() => toggleTopicComplete(topic.id)}
                      variant={completedTopics.includes(topic.id) ? "secondary" : "default"}
                      className="w-full mt-4"
                    >
                      {completedTopics.includes(topic.id) ? 'Изучено' : 'Отметить как изученное'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <Card className="max-w-2xl mx-auto">
              {!showResult ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Вопрос {currentQuestion + 1} из {quizQuestions.length}</CardTitle>
                      <Badge variant="outline">{quizQuestions[currentQuestion].topic}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-lg font-medium">{quizQuestions[currentQuestion].question}</p>
                    
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          variant="outline"
                          className={`w-full justify-start text-left h-auto py-3 px-4 ${
                            selectedAnswer === null 
                              ? 'hover:bg-accent' 
                              : selectedAnswer === index
                                ? index === quizQuestions[currentQuestion].correct
                                  ? 'bg-green-100 border-green-500 text-green-900'
                                  : 'bg-red-100 border-red-500 text-red-900'
                                : index === quizQuestions[currentQuestion].correct
                                  ? 'bg-green-100 border-green-500 text-green-900'
                                  : ''
                          }`}
                          disabled={selectedAnswer !== null}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    
                    {selectedAnswer !== null && (
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuestion < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Показать результат'}
                      </Button>
                    )}
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="text-center">Тест завершён!</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 text-center">
                    <div className="space-y-2">
                      <div className="text-6xl font-bold text-primary">
                        {score}/{quizQuestions.length}
                      </div>
                      <p className="text-muted-foreground">
                        {score === quizQuestions.length 
                          ? 'Отлично! Вы ответили правильно на все вопросы!' 
                          : score >= quizQuestions.length / 2
                            ? 'Хороший результат! Продолжайте учиться!'
                            : 'Повторите материал и попробуйте снова'}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <Icon 
                        name={score === quizQuestions.length ? 'Trophy' : score >= quizQuestions.length / 2 ? 'ThumbsUp' : 'BookOpen'} 
                        size={64} 
                        className="text-primary"
                      />
                    </div>
                    
                    <Button onClick={resetQuiz} className="w-full">
                      Пройти тест снова
                    </Button>
                  </CardContent>
                </>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-16 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Образовательный проект по английскому языку • 9 класс • 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
