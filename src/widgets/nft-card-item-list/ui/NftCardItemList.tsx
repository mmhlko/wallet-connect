"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import { base } from "viem/chains";
import { useAccount } from "wagmi";
import { TAddress } from "@/shared/types";
import { NftCard } from "@/entities/nft-card";
import { TNftCardItem, NftTransaction } from "@/shared/types/nft";
import { nftList } from "@/shared/constants/nft";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { useCounterStore } from "@/app/_providers/CounterStoreProvider";
import { Swiper as SwiperType } from 'swiper';
import { nftApi } from "../api/nftApi";
import { scanInfo } from "@/shared/constants/chainsInfo";
import { classNames } from "@/shared/lib/helpers/classNames";
import { filterNftTransactions } from "@/shared/lib/helpers/filterNftTransactions";
import CardItemSkeleton from "@/shared/ui/CardItemSkeleton";
import { NftCardItem } from "@/entities/nft-item/ui/NftItem";

const ErrorTitle = ({ children }: { children: ReactNode }) => (
    <h2 className="text-[#9F9F9F] text-[40px] text-center font-bold">
        {children}
    </h2>
)

const filterTransactionsByAddress = (transaction: NftTransaction) => (
    nftList.some(address => address.address.toLowerCase() === transaction.contractAddress.toLowerCase())
)

export const NftCardItemList = () => {
    const { nftCount } = useCounterStore((state) => state)
    const [nftItems, setNftItems] = useState<TNftCardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const { address: walletAddress } = useAccount()
    const [showCardPreloader, setShowCardPreloader] = useState(false)
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);
    const swiper = swiperRef.current;

    const fetchNftTokenList = async (scanUrl: string, address: TAddress | undefined, apiKey: string) => {
        try {
            if (address) {
                setLoading(true);
                const data = await nftApi.fetchNftTokenList(scanUrl, address, apiKey);

                if (data.status === "1") {
                    setNftItems(filterNftTransactions(data.result.filter(filterTransactionsByAddress), address));
                } else {
                    setError('Failed to fetch NFT transactions.');
                }
                setIsFetched(true)
            }
        } catch (err) {
            setError((err as Error).message);
            setIsFetched(false)
        }
        setLoading(false);
    };

    const refetchTokenList = async () => {
        setShowCardPreloader(true)
        swiper?.slideTo(swiper.slides.length - 1, 1000)
        const timeoutId = setTimeout(async () => {
            await fetchNftTokenList(scanInfo.base.url, walletAddress, scanInfo.base.apiKey);
            setShowCardPreloader(false)
        }, 5000);
        return () => clearTimeout(timeoutId);
    }

    useEffect(() => {
        fetchNftTokenList(scanInfo.base.url, walletAddress, scanInfo.base.apiKey)
    }, [walletAddress])

    useEffect(() => {
        nftCount && refetchTokenList()
    }, [nftCount])

    if (isFetched && nftItems.length === 0) {
        return (
            <ErrorTitle>{"Wallet connected & you don't have any NFT yet"}</ErrorTitle>
        )
    }
    return (
        <div className="flex flex-col items-center gap-8">
            {loading && nftItems.length === 0 && Array(5).fill(<></>).map((_, index) => (
                <div key={index} className="w-full max-w-[200px]"><CardItemSkeleton /></div>
            ))}
            {isFetched && nftItems.reverse().map((transaction, index) => (
                <NftCardItem key={transaction.contractAddress + transaction.tokenID} contractAddress={transaction.contractAddress} chainId={base.id} type="token" nftItem={transaction} />
            ))}
            {error && (
                <ErrorTitle>{"NFT can not to be loaded"}</ErrorTitle>
            )}
        </div>
    );
}

{/*             <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={40}
                scrollbar={{ draggable: true }}
                modules={[Navigation, Pagination]}
                className="mb-[60px]"
                mousewheel
                //centeredSlides={true}
                grabCursor={true}
                centerInsufficientSlides
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                breakpoints={{
                    // when window width is >= 320px
                    360: {
                        slidesPerView: 1,
                        spaceBetween: -80,
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: -100,
                    },
                    540: {
                        slidesPerView: 1,
                        spaceBetween: -160,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: -180,
                    },
                    840: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },
                }}
            >
                {loading && nftItems.length === 0 && Array(5).fill(<></>).map((_, index) => (
                    <SwiperSlide key={index}>
                        <CardItemSkeleton />
                    </SwiperSlide>
                ))}
                {isFetched && nftItems.map((transaction, index) => (
                    <SwiperSlide key={transaction.contractAddress + transaction.tokenID} virtualIndex={index} className="px-[48px] sm:px-0">
                        <NftCardItem contractAddress={transaction.contractAddress} chainId={base.id} type="token" nftItem={transaction} />
                    </SwiperSlide>
                ))}
                {<SwiperSlide className={classNames(
                    showCardPreloader
                        ? "flex flex-col rounded-[20px] lg:rounded-[16px] gap-[20px] overflow-hidden h-full bg-white p-2.5 pb-[30px] w-full max-w-[350px] shrink-0 mx-auto"
                        : "!hidden !w-0",
                )}>
                    <CardItemSkeleton />
                </SwiperSlide>}
            </Swiper> */}