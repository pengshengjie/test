import React from "react";
import Tag from "antd/es/tag";
import moment from "moment";

export const CurrencyFormat = (money) => {
    if (money != null && money != "-") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
        }).format(money);
    } else {
        return null;
    }
};

export const Currency2Format = (money) => {
    if (money != null && money != "-") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(money);
    } else {
        return null;
    }
};

export const TwoDecimalFormat = (number) => {
    if (number != null && number !== 0) {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number);
    } else {
        return null;
    }
};

export const PercentFormat = (ratio) => {
    if (ratio != null && ratio !== 0) {
        return new Intl.NumberFormat("en-US", {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(ratio);
    } else {
        return null;
    }
};

export const NegativeRed = (e) => {
    if (!e) {
        return null;
    }
    e = e.toString();
    if (e && (e.startsWith("-") || e.startsWith("("))) {
        return <div style={{color: "red"}}>{e}</div>;
    } else {
        return <div>{e}</div>;
    }
};

export const FormatDate = (e) => {
    return new Intl.DateTimeFormat("en-US").format(new Date(e));
};

export const DateTimeFormat = (e) => {
    return moment(e).format("YYYY MM DD, h:mm:ss a");
};

export const Today = () => {
    return new Intl.DateTimeFormat("en-US").format(new Date());
};

export const RenderTag = (e) => {
    return (
        <>
            {e.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                return (
                    <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                );
            })}
        </>
    );
};
