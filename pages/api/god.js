import { QAClient } from 'question-answering';

export default async function handler(req, res) {
  // Get search query
  const query = JSON.parse(req.body);
  console.log(query);

  const text = `
    We’ve allocated €250 (per annum) for Junior and Mid-level colleagues, and €450 (per annum) learning budget for Senior personnel.
    The difference between the two budgets is that conferences and training programs for Seniors are often significantly more expensive.
    All education budgets must be approved by competent Leads.
    If there are exceptional circumstances where educational endeavours exceed the aforementioned budget requirements, Lifely Management will assess the feasibility in the context of current investment strategy and capacity.
    There’s always space to ask.
    Any left-over budget should be transferred back to Lifely, budget is not transferable to the following year.
    This is the case for all budgets.
    Education budget is only applicable for colleagues that have worked at Lifely for over four months.
    Educational projects may take up to one working day a year.
    If a conference or study exceeds this number, you're expected to take a day off using the holidays you have left.
  `;

  const qaClient = await QAClient.fromOptions();
  const answer = await qaClient.predict(query.question, text);

  res.status(200).json(answer)
}
