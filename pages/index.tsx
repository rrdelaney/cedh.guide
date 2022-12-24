import { Dialog, Transition } from '@headlessui/react';
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useMemo, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YouTubeEmbed } from '../components/embed';
import { PageHeader } from '../components/header';
import { translationProps } from '../lib/translations';
import cn from 'classnames';

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
    question: `What's your favorite way to win a game?`,
    answers: [
      `Going for fast winds with explosive combo turns.`,
      `Generating advantage over the course of the same until no one can stop me.`,
      `Slowing down my opponents until I can win in the late game with combat or a combo.`,
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
              onClick={() => onSelect(i)}
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

function DeckFinderAnswer({
  answers,
  onReset,
}: {
  answers: number[];
  onReset: () => void;
}) {
  return (
    <>
      Congrats!!!
      <button
        onClick={onReset}
        className="border-white flex-1 border rounded-sm p-3 transition hover:bg-slate-700"
      >
        Restart
      </button>
    </>
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
      <div className="relative overflow-hidden max-h-[480px] min-h-[480px] md:min-h-[360px] md:max-h-[360px] bg-slate-800">
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
