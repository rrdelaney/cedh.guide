import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useMemo, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YouTubeEmbed } from '../components/embed';
import { PageHeader } from '../components/header';
import { translationProps } from '../lib/translations';

type DeckQuestionSet = {
  question: string;
  answers: [A: string, B: string, C: string];
};

const DECK_QUESTIONS: DeckQuestionSet[] = [
  {
    question: `What's your favorite way to win a game?`,
    answers: [
      `Going for fast winds with explosive combo turns.`,
      `Generating advantage over the course of the same until no one can stop me.`,
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

  console.log({ relevanceByDeck });

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

function FindMyDeckButton() {
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

function CedhBanner() {
  const router = useRouter();
  const showFindDeckButton = useMemo(
    () =>
      process.env.NODE_ENV !== 'production' ||
      ('v2' in router.query && router.query.v2 === '1'),
    [router.query]
  );

  return (
    <div
      className="md:pt-18 mx-auto mb-12 md:mb-20 flex max-w-screen-2xl flex-col items-start px-4 md:px-12 pt-12 md:mt-8 lg:mt-12 lg:pt-24"
      style={{
        backgroundImage: `url(/cedh-guide_card-banner_v2.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="mb-12 max-w-xl text-6xl font-bold leading-tight lg:text-7xl">
        cEDH is Commander, but <em>very</em> spicy.
      </h1>

      <p className="text-2xl font-bold leading-relaxed">
        cEDH is a <em>metagame</em> and <em>mindset</em> where:
      </p>

      <ol className="list-inside list-decimal space-y-2 pt-4 text-2xl font-bold">
        <li>All strategies are accepted.</li>
        <li>Decks majorly affect the game as early as Turn 1.</li>
        <li>Players only make plays that help them win.</li>
        <li>Proxies are encouraged.</li>
      </ol>

      <div className="h-64 mt-8">
        {showFindDeckButton && <FindMyDeckButton />}
      </div>
    </div>
  );
}

function Explanation() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center mb-12 md:mb-20">
      <h1 className="text-4xl font-bold mb-8 text-center">
        A Longer Explanation:
      </h1>
      <YouTubeEmbed src="https://www.youtube.com/embed/zH_ERuiwJWw" />
    </div>
  );
}

function ExampleGames() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center mb-12 md:mb-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Example Games:</h1>
      <div className="w-full grid xl:grid-cols-2 gap-8 justify-center">
        <YouTubeEmbed src="https://www.youtube.com/embed/zpnY5FpAlbY" />
        <YouTubeEmbed src="https://www.youtube.com/embed/rqjYgspEaCk" />
      </div>
    </div>
  );
}

function LearnMore() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center mb-12 md:mb-20 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Want to learn more and start playing?
      </h1>

      <ol className="list-inside list-decimal space-y-2 pt-4 text-2xl">
        <li>
          <Link href="/philosophy" className="underline">
            Read up
          </Link>{' '}
          on the cEDH mindset and meta.
        </li>
        <li>
          <Link href="/decks" className="underline">
            Browse some decklists
          </Link>{' '}
          for intriguing and proven strategies.
        </li>
        <li>
          <Link href="/stats" className="underline">
            Study the statistics
          </Link>{' '}
          to learn patterns and common cards.
        </li>
        <li>
          <Link href="/articles" className="underline">
            Read evergreen articles
          </Link>{' '}
          about cEDH.
        </li>
        <li>
          <Link href="/watch" className="underline">
            Watch videos
          </Link>{' '}
          for stack wars, combat steps, and combos.
        </li>
        <li>
          <Link href="/play" className="underline">
            Play webcam games
          </Link>{' '}
          in inclusive Discord communities.
        </li>
        <li>
          <Link href="/track" className="underline">
            Track your games
          </Link>{' '}
          to help our community adapt and grow.
        </li>
      </ol>
    </div>
  );
}

const loadFeatures = () =>
  import('../lib/framer_motion_features').then((f) => f.domAnimation);

export default function Home() {
  const { t } = useTranslation();

  return (
    <LazyMotion features={loadFeatures} strict>
      <NextSeo
        title={t('what is cedh') ?? 'What is cEDH?'}
        description="cEDH is Commander, but very spicy"
        openGraph={{
          url: 'https://cedh.guide',
          images: [{ url: 'https://cedh.guide/cedh-guide_card-banner_v2.png' }],
        }}
      />

      <PageHeader />
      <CedhBanner />
      <Explanation />
      <ExampleGames />
      <LearnMore />
    </LazyMotion>
  );
}

export const getStaticProps = translationProps(['common']);
