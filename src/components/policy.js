import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';

export default function policy(props) {
  const type = useNavigationParam('type') || props.type;

  return (
    <ScrollView style={styles.container}>
      {type === 'location' ? (
        <View>
          <Text style={styles.h1}>포도 위치기반서비스 이용약관</Text>
          <Text style={styles.h2}>제 1 조 (목적)</Text>
          <Text style={styles.article}>
            본 약관은 포도가 제공하는 위치기반서비스에 대해 포도와 위치기반서비스를 이용하는
            개인위치정보주체(이하 "이용자")간의 권리·의무 및 책임사항, 기타 필요한 사항 규정을
            목적으로 합니다.
          </Text>
          <Text style={styles.h2}>제 2 조 (이용약관의 효력 및 변경)</Text>
          <Text style={styles.article}>
            ① 본 약관은 이용자가 본 약관에 동의하고 포도가 정한 절차에 따라 위치기반서비스의
            이용자로 등록됨으로써 효력이 발생합니다.{`\n`}② 포도는 법률이나 위치기반서비스의
            변경사항을 반영하기 위한 목적 등으로 약관을 수정할 수 있습니다.{`\n`}③ 약관이 변경되는
            경우 포도는 변경사항을 최소 7일 전에 포도의 홈페이지 등 기타 공지사항 페이지를 통해
            게시합니다.{`\n`}④ 단, 개정되는 내용이 이용자 권리의 중대한 변경이 발생하는 경우에는
            30일 전에 게시하도록 하겠습니다.
          </Text>
          <Text style={styles.h2}>제 3 조 (약관 외 준칙)</Text>
          <Text style={styles.article}>
            이 약관에 명시되지 않은 사항에 대해서는 위치 정보의 보호 및 이용 등에 관한 법률,
            전기통신사업법, 정보통신망 이용 촉진및 보호 등에 관한 법률 등 관계법령 및 포도가 정한
            지침 등의 규정에 따릅니다.
          </Text>
          <Text style={styles.h2}>제 4 조 (서비스의 내용)</Text>
          <Text style={styles.article}>
            포도는 직접 수집하거나 위치정보사업자로부터 수집한 이용자의 현재 위치 또는 현재 위치가
            포함된 지역을 이용하여 아래와 같은 위치기반서비스를 제공합니다.{`\n`}
            {`\n`}① 위치정보를 활용한 정보 검색결과 및 콘텐츠를 제공하거나 추천{`\n`}② 생활편의를
            위한 위치 공유, 위치/지역에 따른 알림, 경로 안내{`\n`}
          </Text>
          <Text style={styles.h2}>제 5 조 (서비스 이용요금)</Text>
          <Text style={styles.article}>
            포도가 제공하는 위치기반서비스는 무료입니다.{`\n`}
            단, 무선 서비스 이용 시 발생하는 데이터 통신료는 별도이며, 이용자가 가입한 각
            이동통신사의 정책에 따릅니다.
          </Text>
          <Text style={styles.h2}>제 6 조 (서비스 이용의 제한·중지)</Text>
          <Text style={styles.article}>
            ① 포도는 위치기반서비스사업자의 정책변경 등과 같이 포도의 제반사정 또는 법률상의 이유로
            위치기반서비스를 유지할 수 없는 경우 위치기반서비스의 전부 또는 일부를 제한·변경·중지할
            수 있습니다.{`\n`}② 단, 위 항에 의한 위치기반서비스 중단의 경우 포도는 사전에 포도
            홈페이지 등 기타 공지사항 페이지를 통해 공지하거나 이용자에게 통지합니다.
          </Text>
          <Text style={styles.h2}>제 7 조 (개인위치정보주체의 권리)</Text>
          <Text style={styles.article}>
            ① 이용자는 언제든지 개인위치정보의 수집·이용·제공에 대한 동의 전부 또는 일부를 유보할 수
            있습니다.{`\n`}② 이용자는 언제든지 개인위치정보의 수집·이용·제공에 대한 동의 전부 또는
            일부를 철회할 수 있습니다. 이 경우 포도는 지체 없이 철회된 범위의 개인위치정보 및
            위치정보 수집·이용·제공사실 확인자료를 파기합니다.{`\n`}③ 이용자는 개인위치정보의
            수집·이용·제공의 일시적인 중지를 요구할 수 있으며, 이 경우 포도는 이를 거절할 수 없고
            이를 충족하는 기술적 수단을 마련합니다.{`\n`}
          </Text>
          <Text style={styles.h2}>제 8 조 (개인위치정보의 이용 또는 제공)</Text>
          <Text style={styles.article}>
            ① 포도는 개인위치정보를 이용하여 위치기반서비스를 제공하는 경우 본 약관에 고지하고
            동의를 받습니다.{`\n`}② 포도는 이용자의 동의 없이 개인위치정보를 제3자에게 제공하지
            않으며, 제3자에게 제공하는 경우에는 제공받는 자 및 제공목적을 사전에 이용자에게 고지하고
            동의를 받습니다.{`\n`}③ 포도는 개인위치정보를 이용자가 지정하는 제3자에게 제공하는 경우
            개인위치정보를 수집한 통신단말장치로 매회 이용자에게 제공받는 자, 제공일시 및 제공목적을
            즉시 통지합니다.
          </Text>
          <Text style={styles.h2}>제 9 조 (손해배상)</Text>
          <Text style={styles.article}>
            포도는 고의, 과실이 없는 문제에 대해 책임을 지지 않습니다.
          </Text>
          <Text style={styles.h2}>제 10 조 (면책)</Text>
          <Text style={styles.article}>
            ① 포도는 다음 각 호의 경우로 위치기반서비스를 제공할 수 없는 경우 이로 인하여 이용자에게
            발생한 손해에 대해서는 책임을 부담하지 않습니다.{`\n`}
            1. 천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우{`\n`}
            2. 위치기반서비스 제공을 위하여 포도와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스
            방해가 있는 경우{`\n`}
            3. 이용자의 귀책사유로 위치기반서비스 이용에 장애가 있는 경우{`\n`}
            4. 제1호 내지 제3호를 제외한 기타 포도의 고의·과실이 없는 사유로 인한 경우{`\n`}② 포도는
            위치기반서비스 및 위치기반서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등에
            대해서는 보증을 하지 않으며 이로 인해 발생한 이용자의 손해에 대하여는 책임을 부담하지
            아니합니다.
            {`\n\n\n\n\n\n\n`}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.h1}>포도 개인정보처리방침</Text>
          <Text style={styles.h2}>개인정보 처리방침</Text>
          <Text style={styles.article}>
            포도는 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고 있으며, ‘이용자의
            권리 (개인정보 자기결정권)를 적극적으로 보장’합니다.{`\n`}
            회사는 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
            가이드라인을 준수하고 있습니다.{`\n`}
            “개인정보처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고
            서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다.{`\n`}
          </Text>
          <Text style={styles.h2}>개인정보 수집</Text>
          <Text style={styles.article}>
            서비스 제공을 위한 필요 최소한의 개인정보를 수집하고 있습니다.{`\n`}
            회원 가입 시 또는 서비스 이용 과정에서 어플리케이션을 통해 사진, 이름을 저장합니다.
          </Text>
          <Text style={styles.h2}>개인정보 이용</Text>
          <Text style={styles.article}>
            회원 가입 시 또는 서비스 이용 과정에서 어플리케이션을 통해 아래와 같이 서비스 제공을
            위해 필요한 최소한의 개인정보를 수집하고 있습니다.
          </Text>
          <Text style={styles.h2}>개인정보 파기</Text>
          <Text style={styles.article}>
            전자적 파일 형태인 경우 복구 및 재생되지 않도록 안전하게 삭제하고, 그 밖에 기록물,
            인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다.
            {`\n\n\n\n\n\n\n`}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    fontFamily: 'scdreamBold',
    color: 'rgb(74, 74, 74)'
  },
  h1: {
    fontSize: 18,
    fontFamily: 'scdreamBold',
    marginVertical: 10,
    color: 'rgb(74, 74, 74)'
  },
  h2: {
    fontSize: 15,
    fontFamily: 'scdreamBold',
    marginVertical: 10,
    color: 'rgb(74, 74, 74)'
  },
  article: {
    fontSize: 12,
    fontFamily: 'scdream',
    color: 'rgb(74, 74, 74)'
  }
});
