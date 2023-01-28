import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import { AnimatePresence, m } from 'framer-motion';
import { Fragment, useCallback, useMemo, useReducer, useState } from 'react';
import { YouTubeEmbed } from './embed';

type DeckQuestionSet = {
  question: string;
  answers: [A: string, B: string, C: string];
};

const DECK_QUESTIONS: DeckQuestionSet[] = [
  {
    question: `What's your favorite way to win a game?`,
    answers: [
      `Going for fast wins with explosive combo turns.`,
      `Generating advantage over the course of the game until no one can stop me.`,
      `Slowing down my opponents until I can win in the late game with combat or a combo.`,
    ],
  },
  {
    question: `What's your main approach to interaction?`,
    answers: [
      `I go all in on my own gameplan and let others try to deal with it.`,
      `I like to be able to interact at the perfect moment to protect my plan or stop an opponent's.`,
      `I want to be able to control what my opponents are able to do on most turns.`,
    ],
  },
  {
    question: `What's your preference for creature count?`,
    answers: [
      `I like to play lots of creatures.`,
      `I like to play a mix of card types.`,
      `I like to play mostly non-creatures.`,
    ],
  },
];

function DeckFinderQuestion({
  questionNumber,
  onSelect,
  onBack,
}: {
  questionNumber: number;
  onSelect: (answer: number) => void;
  onBack: () => void;
}) {
  return (
    <>
      <Dialog.Title as="h3" className="text-xl font-medium leading-6 my-6">
        {DECK_QUESTIONS[questionNumber].question}
      </Dialog.Title>

      <div className="w-full flex grid gap-4 auto-rows-fr grid-cols-2">
        {DECK_QUESTIONS[questionNumber].answers.map((answer, i) => {
          return (
            <button
              key={i}
              onClick={() => onSelect(i + 1)}
              className="border-white flex-1 border rounded-sm p-3 hover:bg-slate-700 transition"
            >
              {answer}
            </button>
          );
        })}

        <button
          onClick={onBack}
          disabled={questionNumber === 0}
          className={cn(
            'border-white flex-1 border rounded-sm p-3 transition',
            questionNumber === 0
              ? 'opacity-50'
              : 'opacity-75 hover:opacity-100 hover:bg-slate-700'
          )}
        >
          Go back
        </button>
      </div>
    </>
  );
}

interface DeckFinderResult {
  deckName: string;
  videoUrl: string;
  intro: string;
}

type DeckQuestionAnswer = 1 | 2 | 3;
type DeckQuestionAnswerList =
  `${DeckQuestionAnswer}:${DeckQuestionAnswer}:${DeckQuestionAnswer}`;

const DECK_ANSWER_RESULTS: Partial<
  Record<DeckQuestionAnswerList, DeckFinderResult>
> = {
  '1:1:1': {
    deckName: 'Jeska / Tymna Mad Farm',
    videoUrl: 'https://www.youtube.com/embed/xsss1ptL5AU',
    intro: `This is a turbo deck that uses Ad Nauseam and infinite mana combos to win quick or build advantage with Tymna.`,
  },
  '1:1:2': {
    deckName: 'Korvold Treasure Storm',
    videoUrl: 'https://www.youtube.com/embed/JNnQiYSd9q0',
    intro: `This is a turbo deck that uses Ad Nauseam, Korvold, and Treasure tokens to storm off and find a win.`,
  },
  '1:1:3': {
    deckName: 'Kess Naus',
    videoUrl: 'https://www.youtube.com/embed/4SoDnnYvX1Y',
    intro: `This is a turbo deck that tries to win with Ad Nauseam and wheel effects as soon as possible.`,
  },
  '3:2:2': {
    deckName: 'Kinnan Big Flips',
    videoUrl: 'https://www.youtube.com/embed/iWeL308Ge2g',
    intro: `This is a stax deck that can combo out early or activate Kinnan to flip game-changing creatures.`,
  },
  '3:2:1': {
    deckName: 'Winota Snowball Stax',
    videoUrl: 'https://www.youtube.com/embed/RCD_USHBCHQ',
    intro: `This is a stax deck that quickly layers multiple disruptive creatures and that can put out big damage—or infinite combos—fast.`,
  },
  '2:2:3': {
    deckName: 'Najeela Tempo',
    videoUrl: 'https://www.youtube.com/embed/cmXtCecACcI',
    intro: `This is a midrange deck that can win through token-swarm combat and that plays a high proportion of the meta's best cards`,
  },
  '2:3:3': {
    deckName: 'Niv-Mizzet Control',
    videoUrl: 'https://www.youtube.com/embed/jA_7-a-_RHo',
    intro: `This is a midrange deck that uses its commander for two-card combos after disrupting opponents' gameplans.`,
  },
  '2:2:2': {
    deckName: 'Malcolm Temur Pirates',
    videoUrl: 'https://www.youtube.com/embed/kqVqZi5jNoM',
    intro: `This is a midrange deck that rushes out a winning combo with Glint-Horn Buccaneer while holding plenty of blue interaction.`,
  },
  '2:2:1': {
    deckName: 'Krark / Sakashima Storm',
    videoUrl: 'https://www.youtube.com/embed/wZbPsCb_CfY',
    intro: `This is a midrange deck that uses Krark's triggered ability to piece together a critical mass of resources then storm off.`,
  },
};

function findClosestDeck(answers: number[]) {
  const relevanceByDeck = new Map(
    Object.keys(DECK_ANSWER_RESULTS).map((deckPath) => {
      const relevance = deckPath
        .split(':')
        .reduce((totalRelevance, pathAnswer, i, { length: deckPathLength }) => {
          const multiplier = deckPathLength - 1 - i;
          return (
            totalRelevance +
            (Number(pathAnswer) === answers[i] ? 10 ** multiplier : 0)
          );
        }, 0);

      return [deckPath as keyof typeof DECK_ANSWER_RESULTS, relevance] as const;
    })
  );

  const [mostRelvantDeckPath] = Array.from(relevanceByDeck).reduce(
    (
      [mostRelevantDeck, highestSeenRelevance],
      [currentDeck, currentRelevance]
    ) => {
      if (currentRelevance > highestSeenRelevance) {
        return [currentDeck, currentRelevance];
      } else {
        return [mostRelevantDeck, highestSeenRelevance];
      }
    }
  );

  return DECK_ANSWER_RESULTS[mostRelvantDeckPath]!;
}

function DeckFinderAnswer({
  answers,
  onReset,
}: {
  answers: number[];
  onReset: () => void;
}) {
  const selectedResult = useMemo(() => findClosestDeck(answers), [answers]);

  return (
    <div className="w-full h-full flex flex-col items-start">
      <span className="text-gray-300 text-sm">We think you might like</span>
      <span className="text-2xl font-medium mb-4">
        {selectedResult.deckName}
      </span>

      <p className="text-md font-light mb-4">{selectedResult.intro}</p>
      <div className="flex-1 w-full flex items-center justify-center">
        <YouTubeEmbed src={selectedResult.videoUrl} maxWidth={480} />
      </div>
    </div>
  );
}

const deckFinderDialogVariants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? 300 : -300,
      opacity: 0,
    };
  },
};

interface DeckFinderState {
  direction: 1 | -1;
  answers: number[];
}

interface DeckFinderAddAnswerAction {
  type: 'ADD_ANSWER';
  answer: number;
}

interface DeckFinderBackAction {
  type: 'BACK';
}

interface DeckFinderResetAction {
  type: 'RESET';
}

function deckFinderReducer(
  state: DeckFinderState,
  action:
    | DeckFinderAddAnswerAction
    | DeckFinderBackAction
    | DeckFinderResetAction
): DeckFinderState {
  switch (action.type) {
    case 'BACK':
      return {
        ...state,
        direction: -1,
        answers: state.answers.slice(0, -1),
      };
    case 'ADD_ANSWER':
      return {
        ...state,
        direction: 1,
        answers: [...state.answers, action.answer],
      };
    case 'RESET':
      return { direction: -1, answers: [] };
    default:
      return state;
  }
}

function FindMyDeckDialogContents() {
  const [{ answers, direction }, dispatch] = useReducer(deckFinderReducer, {
    direction: 1,
    answers: [],
  });

  return (
    <>
      <div className="relative overflow-hidden max-h-[480px] min-h-[480px] bg-slate-800">
        <AnimatePresence initial={false} custom={direction}>
          <m.div
            key={answers.length}
            className="absolute w-full h-full flex flex-col justify-center items-start p-4"
            custom={direction}
            variants={deckFinderDialogVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {answers.length === DECK_QUESTIONS.length ? (
              <DeckFinderAnswer
                answers={answers}
                onReset={() => dispatch({ type: 'RESET' })}
              />
            ) : (
              <DeckFinderQuestion
                questionNumber={answers.length}
                onSelect={(i) => dispatch({ type: 'ADD_ANSWER', answer: i })}
                onBack={() => dispatch({ type: 'BACK' })}
              />
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export function FindMyDeckButton() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all rounded-m">
                  <FindMyDeckDialogContents />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <button
        className="rounded-md bg-blue-700 hover:bg-blue-800 transition p-4 font-bold"
        onClick={() => setIsOpen(true)}
      >
        Find My Deck →
      </button>
    </>
  );
}
