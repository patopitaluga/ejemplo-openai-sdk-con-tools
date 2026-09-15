import OpenAI from 'openai';

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: 'gpt-4.1',
  messages: [
    { role: 'system',
      content: `Eres un asistente para ayudar a los estudiantes a estudiar geografía`
    },
    { role: 'user',
      content: `Cuál es la capital de Francia`
    },
  ],
  tools: [
    {
      type: 'function',
      function: {
        name: 'send_email',
        parameters: {
          type: 'object',
          properties: {
            receiver: {
              type: 'string',
              description: 'El receptor del email a enviar',
            },
            subject: {
              type: 'string',
              description: 'El titulo del email',
            },
            body: {
              type: 'string',
              description: 'el cuerpo del email',
            },
          },
          required: ['receiver', 'subject', 'body']
        },
        description: 'Envia emails'
      },
    },

  ]

});

console.log(JSON.stringify(response.choices[0], null, 2));
