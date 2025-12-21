import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    memo, MutableRefObject, useCallback, useRef, useState,
} from 'react';
import PlayIcon from 'shared/assets/icons/play-80-80.svg';
import cls from './VideoDesktop.module.scss';

type VideoNumbers =
    4
    | 8
    | 16
    | 32
    | 64
    | 128
    | 10
    | 20
    | 30
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | 100
    | 110
    | 120;

const borderRClasses: Record<VideoNumbers, string> = {
    4: cls.borderR4,
    8: cls.borderR8,
    16: cls.borderR16,
    32: cls.borderR32,
    64: cls.borderR64,
    128: cls.borderR128,
    10: cls.borderR10,
    20: cls.borderR20,
    30: cls.borderR30,
    40: cls.borderR40,
    50: cls.borderR50,
    60: cls.borderR60,
    70: cls.borderR70,
    80: cls.borderR80,
    90: cls.borderR90,
    100: cls.borderR100,
    110: cls.borderR110,
    120: cls.borderR120,
};

interface VideoDesktopProps extends React.VideoHTMLAttributes<HTMLVideoElement>{
    borderR?: VideoNumbers;
    src: string;
    poster: string;
}

export const VideoDesktop = memo((props: VideoDesktopProps) => {
    const {
        className,
        src = '#',
        poster = '#',
        borderR,
    } = props;
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isInitPlaying, setIsInitPlaying] = useState<boolean>(false);
    const ref = useRef() as MutableRefObject<HTMLVideoElement>;

    const classes: (string | undefined)[] = [
        className,
        borderR && borderRClasses[borderR],
    ];

    const initPlaying = useCallback(() => {
        if (!isInitPlaying) {
            setIsInitPlaying(true);
            setIsPlaying(true);
        }
    }, [isInitPlaying]);

    const onPlay = useCallback((e: any) => {
        const videoPlayers = document.getElementsByTagName('video');
        for (let i = 0; i < videoPlayers.length; i++) {
            if (videoPlayers[i] !== e.target) {
                videoPlayers[i].pause();
            }
        }
        setIsPlaying(true);
    }, []);

    const onPause = useCallback((e: any) => {
        setIsPlaying(false);
    }, []);

    return (
        <div
            className={classNames(cls.VideoDesktop, {}, classes)}
            onClick={initPlaying}
        >
            {isInitPlaying && (
                <video
                    autoPlay
                    controls
                    className={cls.videoTag}
                    ref={ref}
                    onPlay={onPlay}
                    onPause={onPause}
                >
                    <source src={src} type="video/mp4" />
                </video>
            )}
            {!isInitPlaying && (
                <img
                    src={poster}
                    alt="posterImg"
                    className={cls.poster}
                />
            )}
            {!isPlaying && (
                <PlayIcon
                    className={cls.playIcon}
                    onClick={(e: any) => ref.current?.play()}
                />
            )}
        </div>
    );
});
